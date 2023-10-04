import { Typography } from "@mui/material";
import React from "react";

function Featured() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {[1, 2, 3, 4].map((el, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ height: "300px", width: "250px", marginBottom: "30px" }}
            />
            <Typography>Product title</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default Featured;
