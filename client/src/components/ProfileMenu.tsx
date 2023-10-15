import React, { Dispatch } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout, Settings } from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";
import Person2Icon from "@mui/icons-material/Person2";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserObject } from "../store/reducers";
import { logoutUser } from "../store/reducers";
import axios from "axios";
import { AnyAction } from "redux";

function ProfileMenu() {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  console.log(currentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const handleLogout: () => Promise<void> = async () => {
    dispatch(logoutUser());
    const logout = await axios.get(
      "http://localhost:8000/techwise/client/api/user/logout"
    );
    console.log(logout);
  };

  return (
    <div>
      <Tooltip title="Account settings">
        {currentUser.user ? (
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon sx={{ color: "black" }} />}
            sx={{
              backgroundColor: "white",
              color: "black",
              fontSize: "17px",
              "&:hover": {
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <Typography>{currentUser.user?.username}</Typography>
          </Button>
        ) : (
          <Button
            href="/welcome"
            sx={{
              backgroundColor: "white",
              color: "black",
              fontSize: "17px",
              "&:hover": {
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <Person2Icon />
          </Button>
        )}
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              width: "100%",
              color: "grey",
            }}
          >
            <Person3Icon sx={{ mr: "10px" }} /> Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/profile/cart"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "grey",
              width: "100%",
            }}
          >
            <ShoppingCartIcon sx={{ mr: "10px" }} /> Cart
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/profile/cart"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "grey",
              width: "100%",
            }}
          >
            <ShoppingCartIcon sx={{ mr: "10px" }} /> Become a Plus member
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
