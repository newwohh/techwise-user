import React from "react";
import ProfileDrawer from "./ProfileDrawer";

function ProfileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        paddingLeft: "100px",
        paddingTop: "40px",
      }}
    >
      <ProfileDrawer />
      {children}
    </div>
  );
}

export default ProfileWrapper;
