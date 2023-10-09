import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Autocomplete,
  Badge,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Product } from "../pages/ProductsByCategories";
import secureLocalStorage from "react-secure-storage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileMenu from "./ProfileMenu";
import { ProductContext } from "../context/ProductContext";

const ITEM_HEIGHT = 48;

const categories = ["Laptop", "Smartphone"];

function NavBar() {
  const nav = useNavigate();
  const { product } = React.useContext(ProductContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [productByCategory, setProductByCategory] = React.useState<Product[]>(
    []
  );
  const [value, setValue] = React.useState<string | null>("");
  const [category, setCategory] = React.useState<string>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getProduct = async (id: string) => {
    if (localStorage.getItem("productId")) {
      secureLocalStorage.removeItem("productId");
      secureLocalStorage.setItem("productId", id);
    } else if (!localStorage.getItem("productId")) {
      secureLocalStorage.setItem("productId", id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProductsByCategory = async (categoryName: string) => {
    const response = await axios.get(
      `http://localhost:8000/techwise/client/api/product/category/${categoryName}`
    );
    handleClose();

    setCategory(categoryName);
    setProductByCategory(response.data.data);
  };

  const viewData = async (value: string | null) => {
    setValue(value);
    const productFromResponse: Product | undefined = productByCategory.find(
      (productRes: Product) => {
        return productRes.name === value;
      }
    );
    if (productFromResponse) {
      getProduct(productFromResponse._id);
    }
    nav(`/${category}/view/${value}`);
  };

  const cartItemsNumber: number | undefined = product?.length;

  console.log(product, cartItemsNumber);

  return (
    <nav
      style={{ paddingTop: "80px", paddingLeft: "80px", paddingRight: "80px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily: "Helvetica",
              fontSize: "20px",
            }}
            to="/"
          >
            Home
          </NavLink>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ width: "50px", height: "50px", padding: "-120px" }}
            >
              <MenuIcon sx={{ height: "50px" }} />
            </IconButton>
            <Typography variant="h6">Categories</Typography>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {categories.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => getProductsByCategory(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} sx={{ width: 350, display: "flex" }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              onChange={(event: React.FormEvent, newValue: string | null) => {
                setValue(newValue);
              }}
              options={productByCategory.map((option: Product) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                />
              )}
            />
          </Stack>
          <IconButton
            onClick={() => viewData(value)}
            edge="end"
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "50px",
              height: "50px",
              ml: "20px",
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <div>
          <Badge color="secondary" badgeContent={cartItemsNumber}>
            <IconButton>
              <ShoppingCartIcon
                sx={{ height: "42px", width: "42px", margin: -1 }}
              />
            </IconButton>
          </Badge>
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
