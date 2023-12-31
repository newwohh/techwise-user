import { Button, Rating, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Product } from "../pages/ProductsByCategories";
import secureLocalStorage from "react-secure-storage";

export const getProduct = async (product: Product) => {
  if (localStorage.getItem("productId")) {
    secureLocalStorage.removeItem("productId");
    secureLocalStorage.setItem("productId", product._id);
  } else if (!localStorage.getItem("productId")) {
    secureLocalStorage.setItem("productId", product._id);
  }
};
function ProductList({ product }: { product: Product }) {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  return (
    <div
      style={{
        marginLeft: isMatch ? "0" : "50px",
        display: "flex",
        width: isMatch ? "1200px" : "1200px",
        // height: isMatch ? "0px" : "400px",
        alignItems: isMatch ? "normal" : "center",
        justifyContent: isMatch ? "space-between" : "center",
        flexDirection: isMatch ? "row" : "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: isMatch ? "row" : "column",
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
        <NavLink
          to={`view/${product.name.replaceAll(" ", "-")}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            sx={{
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              marginBottom: "10px",
              width: "170px",
            }}
            onClick={() => getProduct(product)}
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
