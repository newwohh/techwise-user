import React from "react";
import { Button, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";

function Orders() {
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );

  const getProduct = async () => {
    const response: AxiosResponse = await axios.get(
      `http://localhost:8000/techwise/client/api/order/all/${currentUser.user?._id}`
    );
    const data = response.data.data;
    console.log(data);
    return data;
  };

  const cancelOrderHandler = async (id: string) => {
    try {
      const response = axios.post(
        `http://localhost:8000/techwise/client/api/order/cancel`,
        {
          orderId: id,
        }
      );

      console.log((await response).data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: () => getProduct(),
    queryKey: ["orders"],
  });

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-650px",
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
        <List>
          {data?.map((el, i: number) => {
            const products = el.products;
            return (
              <ListItem
                sx={{
                  marginTop: "30px",
                  width: "700px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={i}
                secondaryAction={
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => cancelOrderHandler(el._id)}
                  >
                    Cancel Order
                  </Button>
                }
                disablePadding
              >
                {products.map((prod, i: number) => {
                  return (
                    <div key={i}>
                      <Typography>{prod.product.name}</Typography>
                      <Typography>Quantity: {prod.quantity}</Typography>
                      <Typography>Status {el.status}</Typography>
                    </div>
                  );
                })}
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default Orders;
