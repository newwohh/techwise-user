import { Button, Select, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { Product } from "./ProductsByCategories";

function ProductView() {
  const [currproduct, setCurrProduct] = React.useState<Product>();
  const { product } = useContext(ProductContext);

  console.log(product);

  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:8000/techwise/client/api/product/${product}`
    );
    console.log(response.data);
    return setCurrProduct(response.data.data);
  };

  getProduct();
  console.log(currproduct);

  return (
    <div style={{ padding: 70, display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {currproduct?.images.map((el, i: number) => {
          return (
            <img key={i} style={{ height: "150px", width: "150px" }} src={el} />
          );
        })}
      </div>
      <div>
        <img
          style={{ height: "750px", width: "850px" }}
          src={currproduct?.images[1]}
        />
      </div>
      <div
        style={{
          marginLeft: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">{currproduct?.name}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          {currproduct?.price}
        </Typography>
        <Typography>{currproduct?.description}</Typography>
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
        >
          Add to bag
        </Button>
      </div>
    </div>
  );
}

export default ProductView;
