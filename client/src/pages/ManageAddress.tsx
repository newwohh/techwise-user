import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { UserObject } from "../store/reducers";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function ManageAddress() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-550px",
        marginBottom: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
        }}
      >
        {currentUser.user?.addresses.map((el, i) => {
          return (
            <div
              key={i}
              style={{
                padding: "20px",
                width: "300px",
                display: "flex",
                height: "200px",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Typography>{el.addressLine1}</Typography>
              <Typography>{el.addressLine2}</Typography>
              <Typography>{el.city}</Typography>
              <Typography>{el.country}</Typography>
              <Typography>{el.postalCode}</Typography>
              <Typography>{el.state}</Typography>
              <div style={{ display: "flex" }}>
                <Button>Edit</Button>
                <Button sx={{ color: "red" }}>Delete</Button>
              </div>
            </div>
          );
        })}
        <div
          style={{
            padding: "20px",
            width: "300px",
            display: "flex",
            height: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Button onClick={handleOpen}>Add new address</Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ManageAddress;
