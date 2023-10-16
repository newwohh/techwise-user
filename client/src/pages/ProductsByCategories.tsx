import {
  Divider,
  ListItem,
  Typography,
  List,
  Box,
  LinearProgress,
} from "@mui/material";
import ProductList from "../components/ProductList";
import image from "../assets/productlistings.jpg";
import BannerSearch from "../components/BannerSearch";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  screenSize: number;
  processor: string;
  storageCapacityGB: number;
  RAMGB: number;
  cameraMP: number;
  operatingSystem: string;
  color: string;
  availability: boolean;
  seller: string;
  reviews: Array<{
    user: string; // Assuming user ID is a string
    rating: number;
    comment?: string;
    date: Date;
  }>;
  images: string[];
  __v: number;
  quantity?: string;
};

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function ProductsByCategories() {
  const { category } = useParams();
  console.log(category);
  useScrollToTop();
  const fetchProductbyCategory = async () => {
    const response = await axios.get(
      `http://localhost:8000/techwise/client/api/product/category/${category}`
    );
    console.log(response.data);
    return response.data.data;
  };

  const { data, isLoading } = useQuery({
    queryFn: () => fetchProductbyCategory(),
    queryKey: ["products"],
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ marginTop: "50px" }}>
          <Typography variant="h3">{category}</Typography>
        </div>
        <div style={{ marginTop: "50px" }}>
          <List sx={{ width: "1200px" }}>
            {data.map((el: Product, i: number) => {
              return (
                <ListItem key={i}>
                  <ProductList product={el} key={i} />
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ marginTop: "50px", marginBottom: "50px" }} />
        </div>
        <div>
          <img
            src={image}
            style={{
              width: "1200px",
              height: "500px",
              objectFit: "cover",
              borderRadius: "40px",
            }}
          />
          <div
            style={{
              position: "absolute",
              marginTop: "-300px",
              marginLeft: "50px",
            }}
          >
            <BannerSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategories;
