import { List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const allLinkLists = [
  {
    title: "Profile",
    link: "/profile",
  },
  {
    title: "Cart",
    link: "cart",
  },
  {
    title: "Manage Address",
    link: "/address",
  },
];

function ProfileDrawer() {
  return (
    <div style={{ position: "relative", marginBottom: "120px" }}>
      <div
        style={{
          height: "700px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "50px",
        }}
      >
        <List sx={{ width: "100%", margin: "0" }}>
          {allLinkLists.map((el, i) => {
            return (
              <div key={i}>
                <NavLink
                  key={i}
                  to={el.link}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <ListItem
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: 0,
                      width: "100%",
                      height: "100px",
                      textAlign: "center",
                      marginBottom: "10px",
                      color: "black",
                      fontFamily: "Helvetica",
                      fontSize: "22px",
                      borderRadius: "20px",
                      "&:hover": {
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
                        color: "black",
                        transition: "ease-in-out 0.3s",
                      },
                    }}
                  >
                    {el.title}
                  </ListItem>
                </NavLink>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default ProfileDrawer;
