import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { UserObject, setUserObject } from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "430px",
  flexDirection: "column",
  padding: "50px",
};

function ManageAddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const [address, setAddress] = React.useState({
    id: currentUser.user?._id,
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addAddressHandler = async () => {
    const response = await axios.put(
      "http://localhost:8000/techwise/client/api/user/addAddress",
      address
    );

    console.log(response.data);
    const data = response.data.createAddress;
    if (response.data.createAddress) {
      dispatch(setUserObject(data));
    }
  };

  const removeAddressHandler = async (id: string) => {
    const response = await axios.put(
      "http://localhost:8000/techwise/client/api/user/removeAddress",
      {
        addressId: id,
        id: currentUser.user?._id,
      }
    );

    console.log(response.data);
    const data = response.data.user;
    if (response.data.user) {
      dispatch(setUserObject(data));
    }
  };

  console.log(address);

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
                <Button
                  sx={{ color: "red" }}
                  onClick={() => removeAddressHandler(el._id)}
                >
                  Delete
                </Button>
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
          <Button onClick={handleOpen} sx={{ color: "black" }}>
            Add new address
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            placeholder="Company Address"
            value={address.addressLine1}
            onChange={(e) =>
              setAddress({ ...address, addressLine1: e.target.value })
            }
          />
          <TextField
            placeholder="Company Address"
            value={address.addressLine2}
            onChange={(e) =>
              setAddress({ ...address, addressLine2: e.target.value })
            }
          />
          <TextField
            placeholder="Company City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <TextField
            placeholder="Pincode"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <TextField
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <Button
            onClick={addAddressHandler}
            sx={{ marginTop: "30px", color: "black" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ManageAddress;
