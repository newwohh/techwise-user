import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import registerImg from "../assets/register-ecom.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const allPositions = [
  "CEO",
  "CFO",
  "CTO",
  "Manager",
  "Supervisor",
  "Employee",
  "Other",
];

const allBusinessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Corporation",
  "LLC",
  "Other",
];

interface DateType {
  $d: Date;
}

const formatDate = (date: DateType | undefined | null) => {
  if (date && date.$d instanceof Date) {
    const year = date.$d.getFullYear();
    const month = String(date.$d.getMonth() + 1).padStart(2, "0");
    const day = String(date.$d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else {
    console.error("dateValue error:", date);
    return "";
  }
};

function isCredentialsValid(email: string, password: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return isEmailValid && isPasswordValid;
}

function Register() {
  const navigateTo = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState(false);
  const [step, setStep] = React.useState(false);
  const [error, setError] = React.useState(true);
  const [dateValue, setDateValue] = React.useState<DateType | null | undefined>(
    {
      $d: new Date(),
    }
  );
  const [businessType, setBusinessType] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setBusinessType(event.target.value as string);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      gender: event.target.value,
    });
  };

  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    businessName: "",
    businessType,
    gstRegisteredNumber: "",
    phoneNumber: 0,
    dateOfBirth: formatDate(dateValue),
    gender: "",
    position: "",
  });

  const handleStep = () => {
    if (!isCredentialsValid(user.email, user.password)) {
      setError(false);
      return;
    }

    setError(true);
    setStep(true);
  };

  const handleSubmit = async () => {
    if (!isCredentialsValid(user.email, user.password)) {
      setError(false);
      return;
    } else {
      try {
        setLoading(true);
        user.businessType = businessType;
        const response = await axios.post(
          "http://localhost:8000/techwise/client/api/user/signup",
          user
        );
        if (response.status === 201) {
          setLoading(false);
          navigateTo("/welcome");
        } else {
          setLoadingText(true);
        }
        console.log(response.data);
      } catch (error) {
        setLoadingText(true);
        console.log(error);
      }
    }
  };

  console.log(businessType, user);

  return (
    <>
      <div
        style={{ marginLeft: "20px", marginTop: "30px", position: "absolute" }}
      >
        logo
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "200vh",
          height: "100vh",
          alignItems: "center",
        }}
      >
        {step ? (
          <div
            style={{
              width: "100vh",
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              alignItems: "center",
            }}
          >
            <div style={{ width: "350px" }}>
              <FormGroup>
                <Typography sx={{ marginTop: "30px" }}>
                  Business Name
                </Typography>
                <TextField
                  onChange={(e) =>
                    setUser({ ...user, businessName: e.target.value })
                  }
                />
                <Typography sx={{ marginTop: "30px" }}>Position</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.position}
                    onChange={(e) =>
                      setUser({ ...user, position: e.target.value })
                    }
                  >
                    {allPositions.map((el: string, i: number) => {
                      return (
                        <MenuItem key={i} value={el}>
                          {el}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Typography sx={{ marginTop: "30px" }}>
                  Business Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={businessType}
                    onChange={handleChange}
                  >
                    {allBusinessTypes.map((el: string, i: number) => {
                      return (
                        <MenuItem key={i} value={el}>
                          {el}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Typography sx={{ marginTop: "30px" }}>GST No.</Typography>
                <TextField
                  onChange={(e) =>
                    setUser({ ...user, gstRegisteredNumber: e.target.value })
                  }
                />
                <Typography sx={{ marginTop: "30px" }}>Phone Number</Typography>
                <TextField
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: Number(e.target.value) })
                  }
                />
                <Typography sx={{ marginTop: "30px" }}>
                  Date of birth
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={dateValue} onChange={setDateValue} />
                </LocalizationProvider>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "black",
                      width: "150px",
                      height: "45px",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    onClick={() => setStep(false)}
                  >
                    <Typography>Back</Typography>
                  </Button>
                  {loading ? (
                    <Button
                      disabled
                      sx={{
                        border: "1px solid black",
                        width: "150px",
                        height: "45px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "black",
                          border: "1px solid black",
                          color: "white",
                        },
                      }}
                    >
                      {loadingText ? (
                        "Failed"
                      ) : (
                        <CircularProgress
                          size={"17px"}
                          sx={{ color: "black" }}
                        />
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        border: "1px solid black",
                        width: "150px",
                        height: "45px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "black",
                          border: "1px solid black",
                          color: "white",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      <Typography>
                        {loading ? (
                          <CircularProgress
                            sx={{ width: "10px", height: "20px" }}
                          />
                        ) : (
                          "Submit"
                        )}
                      </Typography>
                    </Button>
                  )}
                </div>
              </FormGroup>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100vh",
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <div style={{ marginBottom: "50px" }}>
                  <Typography variant="h4">Techwise</Typography>
                </div>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Get Started with Techwise
                </Typography>
                <Typography variant="h6" sx={{ color: "grey" }}>
                  Manage people easily starting from now
                </Typography>
              </div>
              <FormGroup
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ marginTop: "30px" }}>Name</Typography>
                <TextField
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                />
                <Typography sx={{ marginTop: "30px" }}>Email</Typography>
                {error ? (
                  <TextField
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                ) : (
                  <TextField
                    error
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                )}
                <FormControl sx={{ marginTop: "30px" }}>
                  <FormLabel
                    id="row-radio-buttons-group-label"
                    sx={{ color: "black" }}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                    <FormControlLabel
                      value="disabled"
                      disabled
                      control={<Radio />}
                      label="other"
                    />
                  </RadioGroup>
                </FormControl>
                <Typography sx={{ marginTop: "30px" }}>Password</Typography>
                {error ? (
                  <OutlinedInput
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                ) : (
                  <TextField
                    error
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                )}
                <Typography sx={{ marginTop: "30px" }}>
                  {" "}
                  Confirm Password
                </Typography>
                <OutlinedInput
                  onChange={(e) =>
                    setUser({ ...user, passwordConfirm: e.target.value })
                  }
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Button
                  sx={{
                    margin: "30px",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={() => handleStep()}
                >
                  <Typography>Register</Typography>
                </Button>
                <NavLink
                  to="/welcome"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  <Typography>Already registered? Login</Typography>
                </NavLink>
              </FormGroup>
            </div>
          </div>
        )}

        <div style={{ width: "100vh", height: "100%" }}>
          <img
            src={registerImg}
            alt="intro"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
