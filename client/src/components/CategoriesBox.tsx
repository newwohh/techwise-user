import { Button, Typography } from "@mui/material";

function CategoriesBox({ icon, title }: { icon: JSX.Element; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        style={{
          borderRadius: "30px",
          padding: "10px",
          color: "black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>{icon}</Typography>
        <Typography>{title}</Typography>
      </Button>
    </div>
  );
}

export default CategoriesBox;
