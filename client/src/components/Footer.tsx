import { Button, Typography, useMediaQuery } from "@mui/material";
import FooterSections from "./FooterSections";
import { NavLink } from "react-router-dom";

function Footer() {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: "70px",
          flexDirection: isMatch ? "row" : "column",
        }}
      >
        <div
          style={{ marginTop: "120px", padding: "30px", textAlign: "center" }}
        >
          <Typography variant="h3">Why trust</Typography>
          <Typography variant="h3" sx={{ fontWeight: 1000 }}>
            Techwise ?
          </Typography>
          <NavLink to="/contact">
            <Button
              style={{
                padding: "15px",
                borderRadius: "30px",
                backgroundColor: "black",
                color: "white",
                width: "170px",
              }}
            >
              Contact us
            </Button>
          </NavLink>
        </div>
        <FooterSections />
      </div>
    </footer>
  );
}

export default Footer;
