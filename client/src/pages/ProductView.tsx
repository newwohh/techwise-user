import {
  Box,
  Button,
  Divider,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios, { AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "@tanstack/react-query";
import { ProductContext } from "../context/ProductContext";
import React from "react";
import { useSelector } from "react-redux";
import { UserObject } from "../store/reducers";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Product } from "./ProductsByCategories";
import errorSound from "../assets/error-sounds.mp3";
import useSound from "use-sound";
import Reviews from "../components/Reviews";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductView() {
  const [play] = useSound(errorSound);
  const navigateTo: NavigateFunction = useNavigate();
  const { product, pushItemToArray } = React.useContext(ProductContext);
  const [qtyError, setQtyError] = React.useState<boolean>(false);
  const [unit, setUnit] = React.useState<string | undefined>();
  const { user } = useSelector((state: { user: UserObject }) => state.user);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const id: string | number | boolean | object | null =
    secureLocalStorage.getItem("productId");
  const getProduct = async (
    idProduct: string | number | boolean | object | null
  ) => {
    const response: AxiosResponse = await axios.get(
      `http://localhost:8000/techwise/client/api/product/${idProduct}`
    );
    const data = response.data.data;
    data.quantity = unit;
    console.log(data);
    return data;
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

  const handleChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value as string);
  };

  const handleSubmit = async () => {
    if (user) {
      data.quantity = unit;
      const dataNew: Product = data;

      if (!unit) {
        return setQtyError(true);
      }

      const isInCart = product?.some((el: Product) => {
        return el._id === dataNew._id;
      });

      if (isInCart) {
        handleClick();
        play();
      } else {
        pushItemToArray(dataNew);
      }
    } else {
      navigateTo("/welcome");
    }
  };
  console.log(id, product, unit);

  return (
    <div>
      <div style={{ padding: 70, display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data?.images.map((el: string, i: number) => {
            return (
              <img
                key={i}
                style={{ height: "150px", width: "150px" }}
                src={el}
              />
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
            <Select sx={{ width: "100%" }} value={unit} onChange={handleChange}>
              <MenuItem value={1000}>1000 units</MenuItem>
              <MenuItem value={2000}>2000 units</MenuItem>
              <MenuItem value={5000}>5000 units</MenuItem>
            </Select>
            {qtyError && (
              <Typography sx={{ color: "red" }}>
                *Please select a quantity
              </Typography>
            )}
          </div>
          <Button
            sx={{ padding: "10px", backgroundColor: "black", color: "white" }}
            onClick={handleSubmit}
          >
            Add to bag
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Product is already in your cart
          </Alert>
        </Snackbar>
      </div>
      <Divider />
      <div style={{ padding: "100px" }}>
        <Reviews data={data} />
      </div>
    </div>
  );
}

export default ProductView;
