import { Input, Typography } from "@mui/material";

function BannerSearch() {
  return (
    <div style={{ color: "black" }}>
      <Typography variant="h3" sx={{ fontWeight: "1000" }}>
        The Best Products <br />
        <span>
          <Typography variant="h3">in every category</Typography>
        </span>
      </Typography>
      <Input
        placeholder="Search"
        sx={{
          marginTop: "30px",
          width: { lg: "100%", xm: "100px" },
          color: "black",
        }}
      />
    </div>
  );
}

export default BannerSearch;
