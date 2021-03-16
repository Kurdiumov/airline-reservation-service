import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import validator from "validator";
import useInput from "../Hooks/useInput";
import { login } from "../Actions/auth";
import { TextField, Box, Button, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      "margin-top": theme.spacing(2),
      "margin-bottom": theme.spacing(2)
    },
    "& .MuiFormHelperText-contained.MuiFormHelperText-root": {
      position: "absolute",
      top: "3.5rem"
    }
  }
}));

export default function LogInForm(props) {
  const url = `${process.env.REACT_APP_API_URL}/api/user/login`;
  const dispatch = useDispatch();
  const classes = useStyles();

  const email = useInput("");
  const password = useInput("");
  const [responseError, setResponseError] = useState("");
  const [redirect] = useState(props.redirect ? props.redirect : "/");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    if (!emailValid || !passwordValid) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });

      if (response.status === 200) {
        const token = response.headers.get("auth-token");
        const user = await response.json();
        dispatch(login(token, user.name, user.surname));
        props.history.push(redirect);
        return;
      }

      const responseText = await response.text();

      setResponseError(responseText);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const validateEmail = () => {
    const isValid = validator.isEmail(email.value);
    setEmailError(isValid ? "" : "Email is not valid.");
    return isValid;
  };

  const validatePassword = () => {
    const isValid = !validator.isEmpty(password.value);
    setPasswordError(isValid ? "" : "Password must be provided.");
    return isValid;
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormHelperText
        error={true}
        style={{ textAlign: "center", height: "0.75rem" }}
      >
        {responseError}
      </FormHelperText>
      <TextField
        label="email"
        variant="outlined"
        fullWidth={true}
        type="email"
        name="email"
        autoComplete="username"
        onBlur={validateEmail}
        error={!!emailError}
        helperText={emailError}
        margin="none"
        {...email.bind}
      />
      <TextField
        label="password"
        variant="outlined"
        fullWidth={true}
        type="password"
        name="password"
        autoComplete="current-password"
        onBlur={validatePassword}
        error={!!passwordError}
        helperText={passwordError}
        {...password.bind}
      />
      <Box display="flex" justifyContent="space-between" p={1}>
        <Button
          color="inherit"
          component={Link}
          style={{
            backgroundColor: "transparent",
            textDecoration: "underline"
          }}
          to={{
            pathname: "/signup",
            state: {
              redirect: redirect
            }
          }}
        >
          Sign up
        </Button>
        <Button type="submit" variant="contained" color="primary">
          LOG IN
        </Button>
      </Box>
    </form>
  );
}
