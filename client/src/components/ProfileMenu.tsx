import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";

import { NavLink } from "react-router-dom";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Account settings">
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
          Profile
        </Button>
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
              color: "black",
              width: "100%",
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
              color: "black",
              width: "100%",
            }}
          >
            <ShoppingCartIcon sx={{ mr: "10px" }} /> Cart
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
