import React from "react";
import {
  Button,
  CircularProgress,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserObject } from "../store/reducers";

function SignIn() {
  const [loadingText, setLoadingText] = React.useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  function isCredentialsValid(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    return isEmailValid && isPasswordValid;
  }

  const handleSubmit = async () => {
    try {
      if (!isCredentialsValid(user.email, user.password)) {
        setError(false);
        return;
      } else {
        setLoading(true);
        setError(true);
        const response = await axios.post(
          "http://localhost:8000/techwise/client/api/user/login",
          user,
          {
            withCredentials: true,
          }
        );
        const data = response.data.data.user;
        dispatch(setUserObject(data));
        console.log(response.data.data.user);
        setLoading(false);
        if (response.data.status === "success") {
          navigateTo("/");
          location.reload();
        } else {
          setLoadingText(true);
        }
      }
    } catch (error) {
      setLoadingText(true);
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: "20px",
          padding: "70px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <Typography variant="h3">Welcome back!</Typography>
        <Typography variant="h3">Techwise</Typography>
        <FormGroup sx={{ marginTop: "30px" }}>
          {error ? (
            <TextField
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
          ) : (
            <TextField
              error
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
              helperText="Please enter a valid email address"
            />
          )}

          {}
          {error ? (
            <TextField
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              sx={{ marginTop: "30px" }}
            />
          ) : (
            <TextField
              error
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              sx={{ marginTop: "30px", width: "350px" }}
              helperText="Weak password. Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters."
            />
          )}
          {loading ? (
            <Button
              sx={{
                margin: "30px",
                backgroundColor: "black",
                padding: "10px",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              {loadingText ? (
                "Oops failed! Please try again"
              ) : (
                <CircularProgress size={"17px"} sx={{ color: "white" }} />
              )}
            </Button>
          ) : (
            <Button
              sx={{
                margin: "30px",
                backgroundColor: "black",
                padding: "10px",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography>Login</Typography>
            </Button>
          )}
          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
            }}
          >
            <Typography>Not a member? Register here</Typography>
          </NavLink>
        </FormGroup>
      </div>
    </div>
  );
}

export default SignIn;
