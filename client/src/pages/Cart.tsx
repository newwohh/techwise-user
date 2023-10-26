import {
  Button,
  Container,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { ProductContext } from "../context/ProductContext";
import { Product } from "./ProductsByCategories";
import { initPayment } from "../api";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";
import axios from "axios";

function Cart() {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState(false);
  const { product } = React.useContext(ProductContext);
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const prices = product?.map((el: Product) => {
    return el.price;
  });
  const Total: number | undefined = prices?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const products = product?.slice(1);

  const orderModelData = products?.map((el) => {
    return { product: el._id, quantity: el.quantity, price: el.price };
  });

  const orderData = {
    user: currentUser.user?._id,
    products: orderModelData,
    address: currentUser.user?.addresses[0],
    totalAmount: Total,
  };

  const placeOrder = async (data, paymentData) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/techwise/client/api/order/create",
        data
      );

      if (response.status === 200) {
        initPayment(paymentData);
        setLoadingText(false);
        setLoading(false);
      } else {
        setLoadingText(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setLoadingText(true);
      console.log(error.message);
    }
  };

  const createPayment = async (data) => {
    try {
      setLoading(true);
      const request: Response = await fetch(
        "http://localhost:8000/techwise/client/api/payment/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: data.totalAmount * 100,
          }),
          credentials: "include",
        }
      );

      const response = await request.json();
      console.log(response);
      if (response.id) {
        placeOrder(data, response);
      }
    } catch (error) {
      setLoading(false);
      setLoadingText(false);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: { lg: "-750px", xs: "0" },
        marginBottom: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
          flexDirection: isMatch ? "row" : "column",
          alignItems: isMatch ? "normal" : "center",
        }}
      >
        {products?.length === 0 ? (
          <Typography>No items found in your cart</Typography>
        ) : (
          <>
            <div>
              <List>
                {products?.map((el: Product, i: number) => {
                  return (
                    <ListItem key={i}>
                      <img
                        src={el.images[0]}
                        alt="prod-img"
                        style={{ width: "250px", height: "250px" }}
                      />
                      <div style={{ marginLeft: "30px" }}>
                        <Typography>{el.name}</Typography>
                        <Typography>${el.price}</Typography>
                        <Typography>Quantity: {el.quantity}</Typography>
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <div>
              <List
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h5">Total: ${Total}</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h5">
                    Items: {products?.length}
                  </Typography>
                </ListItem>
                <ListItem sx={{ width: "100%" }}>
                  {loading ? (
                    <Button
                      sx={{
                        marginTop: "50px",
                        backgroundColor: "black",
                        color: "white",
                        height: "60px",
                        width: "250px",
                        "&:hover": { backgroundColor: "black", color: "white" },
                      }}
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        marginTop: "50px",
                        backgroundColor: "black",
                        color: "white",
                        height: "60px",
                        width: "250px",
                        "&:hover": { backgroundColor: "black", color: "white" },
                      }}
                      onClick={() => createPayment(orderData)}
                    >
                      {loadingText ? "Failed Try again" : "Place Order"}
                    </Button>
                  )}
                </ListItem>
              </List>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default Cart;
