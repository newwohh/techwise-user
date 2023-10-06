import { Button, Rating, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Product } from "../pages/ProductsByCategories";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function ProductList({ product }: { product: Product }) {
  const { setProduct } = useContext(ProductContext);
  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:8000/techwise/client/api/product/${product._id}`
    );
    console.log(response.data);
    return setProduct(response.data.data._id);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <img style={{ height: "150px", width: "200px" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{product.name}</Typography>
          <Typography component="legend">2/5</Typography>
          <Rating name="read-only" value={2} readOnly />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <NavLink to={`view/${product.name}`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              marginBottom: "10px",
              width: "170px",
            }}
            onClick={getProduct}
          >
            View
          </Button>
        </NavLink>
        <Typography>Available sellers No.s</Typography>
      </div>
    </div>
  );
}

export default ProductList;
