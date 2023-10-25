import React from "react";
import ProfileDrawer from "./ProfileDrawer";
import { useMediaQuery } from "@mui/material";

function ProfileWrapper({ children }: { children: React.ReactNode }) {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  return (
    <div
      style={{
        paddingLeft: "100px",
        paddingTop: "40px",
      }}
    >
      {isMatch && <ProfileDrawer />}
      {children}
    </div>
  );
}

export default ProfileWrapper;
