import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function CategoriesBox({ icon, title }: { icon: JSX.Element; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <NavLink
        style={{
          borderRadius: "30px",
          padding: "10px",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
        }}
        to={`category/${title}`}
      >
        <Typography>{icon}</Typography>
        <Typography>{title}</Typography>
      </NavLink>
    </div>
  );
}

export default CategoriesBox;
