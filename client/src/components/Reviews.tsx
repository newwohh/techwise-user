import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Product } from "../pages/ProductsByCategories";

function Reviews({ data }: { data: Product }) {
  console.log(data);

  return (
    <div>
      <div>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "30px" }}
        >
          Reviews
        </Typography>
        <Typography gutterBottom sx={{ marginBottom: "30px" }}>
          At Techwise, we believe that informed decisions lead to exceptional
          experiences. That's why we value the power of feedback and the voice
          of our community. Our "Reviews" section is the heart of candid and
          insightful product feedback.
        </Typography>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "350px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "39px" }}>
            {data.averageRating}
          </Typography>
          <Typography>
            Out of <br /> 5 Stars
          </Typography>
          <Rating name="read-only" value={data.averageRating} readOnly />
        </div>
        <div
          style={{ marginTop: "10px", display: "flex", justifyContent: "end" }}
        >
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: "15px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Add Review
          </Button>
        </div>
      </div>

      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          marginTop: "60px",
        }}
      >
        {data.reviews?.map((el, i) => {
          const dateString = "2023-10-17T12:19:09.715Z";
          const date = new Date(dateString);

          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          };

          const formattedDate = date.toLocaleDateString("en-US", options);
          return (
            <ListItem
              key={i}
              alignItems="flex-start"
              sx={{ height: "200px", width: "300px" }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={el.user.fullName}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Rating value={el.rating} />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {el.user.fullName}
                    </Typography>
                    <Typography>{formattedDate}</Typography>
                    {el.comment}
                  </div>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Reviews;
