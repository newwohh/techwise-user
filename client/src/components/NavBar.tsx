import React from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { InputAdornment, TextField, Typography } from "@mui/material";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
            sx={{ width: "100px", height: "50px", padding: "-120px" }}
          >
            <MenuIcon />
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
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div>
        <TextField
          sx={{ width: "500px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <NavLink
          style={{
            fontSize: "20px",
            textDecoration: "none",
            color: "black",
            fontFamily: "Helvetica",
          }}
          to="/about"
        >
          About
        </NavLink>
      </div>
      <div>
        <NavLink
          to="to"
          style={{
            fontSize: "20px",
            textDecoration: "none",
            color: "black",
            fontFamily: "Helvetica",
          }}
        >
          Help
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
