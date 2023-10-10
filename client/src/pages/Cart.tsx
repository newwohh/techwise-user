import { Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ProductContext } from "../context/ProductContext";
import { Product } from "./ProductsByCategories";

function Cart() {
  const { product } = React.useContext(ProductContext);
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-750px",
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
        <div>
          <List>
            {products?.map((el: Product, i: number) => {
              return (
                <ListItem key={i}>
                  <img src={el.images[0]} alt="prod-img" />
                  <div style={{ marginLeft: "30px" }}>
                    <Typography>{el.name}</Typography>
                    <Typography>${el.price}</Typography>
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
              <Typography variant="h5">Items: {products?.length}</Typography>
            </ListItem>
            <ListItem sx={{ width: "100%" }}>
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
                Place order
              </Button>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}

export default Cart;
