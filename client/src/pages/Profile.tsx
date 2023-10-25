import React from "react";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { UserObject } from "../store/reducers";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserObject } from "../store/reducers";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Profile() {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();
  const currentUser: UserObject = useSelector(
    (state: { user: UserObject }) => state.user
  );
  const [image, setImage] = React.useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No files selected.");
      return;
    }

    setImage(event.target.files);
    const base64 = await convertBase64(event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/techwise/client/api/user/updateProfilePic",
        {
          user: currentUser.user?._id,
          image: base64,
        }
      );

      console.log(response.data);
      const data = response.data.user;
      dispatch(setUserObject(data));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const [updateUser, setUpdateUser] = React.useState({
    id: currentUser.user?._id,
    name: currentUser.user?.fullName,
    email: currentUser.user?.email,
    mobile: currentUser.user?.phoneNumber,
    username: currentUser.user?.username,
  });
  const [value, setValue] = React.useState("female");
  const [update, setUpdate] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const upadteUserHandler = async () => {
    try {
      const request = await axios.post(
        "http://localhost:8000/techwise/client/api/user/update",
        updateUser
      );

      console.log(request.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("unexpected error occured:" + error);
      }
    }
  };

  console.log(currentUser.user?.profilePicture);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: { lg: "-750px", xs: "0" },
        marginBottom: "100px",
      }}
    >
      <div>
        <Avatar
          src={currentUser.user?.profilePicture}
          sx={{ width: "200px", height: "200px" }}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={uploadImage} />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isMatch ? "space-between" : "center",
          alignItems: isMatch ? "normal" : "center",
          width: "600px",
          flexDirection: isMatch ? "row" : "column",
        }}
      >
        {update ? (
          <TextField
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                name: e.target.value,
              })
            }
          />
        ) : (
          <TextField
            disabled
            sx={{ width: { xs: "230px" } }}
            placeholder={currentUser.user?.fullName}
          />
        )}
        {update ? (
          <TextField
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                username: e.target.value,
              })
            }
          />
        ) : (
          <TextField
            disabled
            sx={{ width: { xs: "230px" } }}
            placeholder={currentUser.user?.username}
          />
        )}
      </div>
      <div style={{ display: "flex", marginTop: "40px" }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {update ? (
              <>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </>
            ) : (
              <>
                <FormControlLabel
                  disabled
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  disabled
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  disabled
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </>
            )}
          </RadioGroup>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isMatch ? "space-between" : "center",
          alignItems: isMatch ? "normal" : "center",
          flexDirection: isMatch ? "row" : "column",
          width: "600px",
          marginTop: "40px",
        }}
      >
        {update ? (
          <TextField placeholder="Email" />
        ) : (
          <TextField disabled placeholder={currentUser.user?.email} />
        )}
        {update ? (
          <TextField placeholder="Password" />
        ) : (
          <TextField disabled placeholder="Password" />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "600px",
          marginTop: "40px",
        }}
      >
        {update ? (
          <TextField placeholder="Mobile Number" />
        ) : (
          <TextField disabled placeholder={currentUser.user?.phoneNumber} />
        )}
      </div>
      <div
        style={{
          width: "320px",
          display: "flex",
          justifyContent: update ? "space-between" : "center",
          marginTop: "30px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "150px",
            height: "50px",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={() => setUpdate(!update)}
        >
          {update ? "Done" : "Edit"}
        </Button>
        {update ? (
          <Button
            variant="outlined"
            sx={{
              color: "black",
              border: "2px solid black",
              width: "150px",
              height: "50px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                border: "2px solid black",
              },
            }}
            onClick={() => upadteUserHandler()}
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default Profile;
