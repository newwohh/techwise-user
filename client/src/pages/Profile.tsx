import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function Profile() {
  const [value, setValue] = React.useState("female");
  const [update, setUpdate] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  console.log(value);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-600px",
        marginBottom: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "600px",
        }}
      >
        {update ? (
          <TextField placeholder="Firstname" />
        ) : (
          <TextField disabled placeholder="Firstname" />
        )}
        {update ? (
          <TextField placeholder="Lastname" />
        ) : (
          <TextField disabled placeholder="Lastname" />
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
          justifyContent: "space-between",
          width: "600px",
          marginTop: "40px",
        }}
      >
        {update ? (
          <TextField placeholder="Email" />
        ) : (
          <TextField disabled placeholder="Email" />
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
          <TextField disabled placeholder="Mobile Number" />
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
            onClick={() => setUpdate(!update)}
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Profile;
