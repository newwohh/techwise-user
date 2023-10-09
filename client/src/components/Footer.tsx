import { Button, Typography } from "@mui/material";
import FooterSections from "./FooterSections";

function Footer() {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: "70px",
        }}
      >
        <div
          style={{ marginTop: "120px", padding: "30px", textAlign: "center" }}
        >
          <Typography variant="h3">Why trust</Typography>
          <Typography variant="h3" sx={{ fontWeight: 1000 }}>
            Techwise ?
          </Typography>
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
        </div>
        <FooterSections />
      </div>
    </footer>
  );
}

export default Footer;
