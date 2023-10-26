import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserObject, logoutUser } from "../store/reducers";
import axios from "axios";
import { AnyAction } from "redux";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Profile",
    link: "/profile",
  },
  {
    title: "Cart",
    link: "/profile/cart",
  },
  {
    title: "Orders",
    link: "/profile/orders",
  },
];

const navLinks2 = [
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Become a plus member",
    link: "/becomeplus",
  },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileDrawer() {
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const dispatch: React.Dispatch<AnyAction> = useDispatch();
  const handleLogout: () => Promise<void> = async () => {
    dispatch(logoutUser());
    const logout = await axios.get(
      "http://localhost:8000/techwise/client/api/user/logout"
    );
    console.log(logout);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "black" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Techwise B2B Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navLinks.map((text, index) => (
            <ListItem key={text.title} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <NavLink
                  to={text.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={text.title} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {navLinks2.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <NavLink
                  to={text.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={text.title} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
          {currentUser.user && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            {currentUser.user ? (
              <ListItemButton href="/profile">
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    currentUser.user ? `${currentUser.user?.username}` : "Login"
                  }
                />
              </ListItemButton>
            ) : (
              <ListItemButton href="/welcome">
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
