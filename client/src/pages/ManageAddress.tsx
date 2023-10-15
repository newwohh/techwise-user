import { Button, Typography } from "@mui/material";
import React from "react";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";

function ManageAddress() {
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-550px",
        marginBottom: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
        }}
      >
        {currentUser.user?.addresses.map((el, i) => {
          return (
            <div
              key={i}
              style={{
                padding: "20px",
                width: "300px",
                display: "flex",
                height: "200px",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Typography>{el.addressLine1}</Typography>
              <Typography>{el.addressLine2}</Typography>
              <Typography>{el.city}</Typography>
              <Typography>{el.country}</Typography>
              <Typography>{el.postalCode}</Typography>
              <Typography>{el.state}</Typography>
              <div style={{ display: "flex" }}>
                <Button>Edit</Button>
                <Button sx={{ color: "red" }}>Delete</Button>
              </div>
            </div>
          );
        })}
        <div
          style={{
            padding: "20px",
            width: "300px",
            display: "flex",
            height: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Button>Add new address</Button>
        </div>
      </div>
    </div>
  );
}

export default ManageAddress;
