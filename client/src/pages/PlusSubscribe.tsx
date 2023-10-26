import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { UserObject, setUserObject } from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";

function PlusSubscribe() {
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const dispatch = useDispatch();

  const plusMemberHandler = async () => {
    try {
      const request = await axios.put(
        "http://localhost:8000/techwise/client/api/user/becomePlus",
        {
          id: currentUser.user?._id,
        }
      );

      const data = request.data.user;
      dispatch(setUserObject(data));
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{ width: "900px", textAlign: "center", fontFamily: "Helvetica" }}
      >
        <h1>Plus membership by Techwise</h1>
        <p>
          At Techwise, we're more than just an online store; we're your gateway
          to a world of convenience, savings, and exclusive benefits. We believe
          that shopping should be an enjoyable experience, and that's why we've
          created a membership program that takes your shopping journey to the
          next level.
        </p>

        <ol>
          <li>
            <strong>Free Delivery for All Products:</strong>
            <p>
              Say goodbye to delivery fees! As a Techwise member, enjoy free and
              fast delivery on all your orders. No minimum spend required.
              Whether it's a single item or a bulk purchase, we've got your
              delivery covered.
            </p>
          </li>
          <li>
            <strong>10% Off on All Products:</strong>
            <p>
              Who doesn't love a discount? We know you do! With your membership,
              you'll receive a flat 10% off on every product in our extensive
              collection. Save big on electronics, fashion, home essentials, and
              more.
            </p>
          </li>
          <li>
            <strong>Bulk Orders Made Easy:</strong>
            <p>
              Need products in large quantities for your business? No problem.
              Our members have the privilege of placing orders above 5000 units,
              ensuring you have everything you need to keep your operations
              running smoothly.
            </p>
          </li>
        </ol>
        <Button onClick={plusMemberHandler}>Become Plus Member</Button>
      </div>
    </div>
  );
}

export default PlusSubscribe;
