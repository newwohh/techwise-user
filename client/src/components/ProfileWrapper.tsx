import React from "react";
import ProfileDrawer from "./ProfileDrawer";

function ProfileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileDrawer />
      {children}
    </>
  );
}

export default ProfileWrapper;
