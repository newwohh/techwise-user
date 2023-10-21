import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Product } from "../pages/ProductsByCategories";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";
import axios from "axios";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function Reviews({ data }: { data: Product }) {
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const [value, setValue] = React.useState<number | null>(2);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(data);

  const addReview = async () => {
    const response = await axios.post(
      `http://localhost:8000/techwise/client/api/product/${data._id}/reviews`,
      {
        user: currentUser.user?._id,
        rating: value,
        comment: comment,
      }
    );
    console.log(response);
  };

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
            onClick={handleOpen}
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
          const dateString = el.date;
          const date = new Date(dateString);

          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          return (
            <ListItem
              key={i}
              alignItems="flex-start"
              sx={{ height: "200px", width: "300px" }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={el.user?.fullName}
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
                      {el.user?.fullName}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Rating
            sx={{ marginTop: "20px" }}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Button
            sx={{
              marginTop: "20px",
              backgroundColor: "black",
              color: "white",
              padding: "9px",
              width: "100px",
              "&:hover": { backgroundColor: "black" },
            }}
            onClick={addReview}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Reviews;
