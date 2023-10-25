import {
  Button,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductContext } from "../context/ProductContext";
import { Product } from "./ProductsByCategories";
import { placeOrder } from "../api";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";

function Cart() {
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

  const createPayment = async (data) => {
    try {
      setLoading(true);
      const request = await fetch(
        "http://localhost:8000/techwise/client/api/payment/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 100000,
          }),
          credentials: "include",
        }
      );

      const response = await request.json();
      console.log(response);
      if (response.id) {
        // initPayment(response);
        placeOrder(data);
        setLoadingText(true);
      }
    } catch (error) {
      setLoadingText(true);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-750px",
        marginBottom: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
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
                      <img src={el.images[0]} alt="prod-img" />
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
                      {loadingText ? (
                        "Success"
                      ) : (
                        <CircularProgress
                          size={"17px"}
                          sx={{ color: "white" }}
                        />
                      )}
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
                      Place order
                    </Button>
                  )}
                </ListItem>
              </List>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
