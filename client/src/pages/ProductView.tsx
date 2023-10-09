import { Box, Button, LinearProgress, Select, Typography } from "@mui/material";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "@tanstack/react-query";
import { ProductContext } from "../context/ProductContext";
import React from "react";

function ProductView() {
  const { product, pushItemToArray } = React.useContext(ProductContext);

  const id: string | number | boolean | object | null =
    secureLocalStorage.getItem("productId");
  const getProduct = async (
    idProduct: string | number | boolean | object | null
  ) => {
    const response = await axios.get(
      `http://localhost:8000/techwise/client/api/product/${idProduct}`
    );
    console.log(response.data);
    return response.data.data;
  };

  const { data, isLoading } = useQuery({
    queryFn: () => getProduct(id),
    queryKey: ["product"],
  });

  if (isLoading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearProgress sx={{ color: "black" }} color="inherit" />
        </Box>
      </div>
    );
  }

  const handleSubmit = async () => {
    const dataNew = data;
    pushItemToArray(dataNew);
  };
  console.log(id, product);

  return (
    <div style={{ padding: 70, display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.images.map((el: string, i: number) => {
          return (
            <img key={i} style={{ height: "150px", width: "150px" }} src={el} />
          );
        })}
      </div>
      <div>
        <img
          style={{ height: "750px", width: "850px" }}
          src={data?.images[1]}
        />
      </div>
      <div
        style={{
          marginLeft: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h3">{data?.name}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{data?.price}</Typography>
        <Typography>{data?.description}</Typography>
        <div>
          <Typography>Quantity</Typography>
          <Select sx={{ width: "100%" }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Select>
        </div>
        <Button
          sx={{ padding: "10px", backgroundColor: "black", color: "white" }}
          onClick={handleSubmit}
        >
          Add to bag
        </Button>
      </div>
    </div>
  );
}

export default ProductView;
