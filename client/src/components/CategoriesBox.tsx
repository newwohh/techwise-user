import { Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";

function CategoriesBox({ icon, title }: { icon: JSX.Element; title: string }) {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMatch ? "normal" : "center",
      }}
    >
      <NavLink
        style={{
          borderRadius: "30px",
          padding: "10px",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          width: isMatch ? 0 : "100px",
          height: isMatch ? 0 : "100px",
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
