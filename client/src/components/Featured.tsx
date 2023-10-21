import { Button, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Product } from "../pages/ProductsByCategories";
import { NavLink } from "react-router-dom";
import { getProduct } from "./ProductList";

function Featured() {
  const getFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/techwise/client/api/order/trend"
      );

      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: () => getFeaturedProducts(),
    queryKey: ["featured"],
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log(data);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {data?.map((el: Product, i: number) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              // src={e}
              style={{ height: "300px", width: "250px", marginBottom: "30px" }}
            />
            <NavLink
              to={`/category/${el.category}/view/${el.name.replaceAll(
                " ",
                "-"
              )}`}
            >
              <Button onClick={() => getProduct(el)}>
                <Typography>{el.name}</Typography>
              </Button>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Featured;
