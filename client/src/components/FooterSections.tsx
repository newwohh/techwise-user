import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Icon, Typography } from "@mui/material";

const allFooterSections = [
  {
    icon: <SearchIcon sx={{ fontSize: "50px" }} />,
    title: "Research",
    description: "Research is creative and systematic work undertaken",
  },
  {
    icon: <RateReviewIcon />,
    title: "Reviews",
    description: "Reviews is an evaluation of a publication service",
  },
  {
    icon: <ThumbUpAltIcon />,
    title: "Solutions",
    description: "Solutions is an evaluation of a publication service",
  },
];

function FooterSections() {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {allFooterSections.map((el, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "500px",
            }}
          >
            <Icon>{el.icon}</Icon>
            <Typography>{el.title}</Typography>
            <Typography>{el.description}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default FooterSections;
