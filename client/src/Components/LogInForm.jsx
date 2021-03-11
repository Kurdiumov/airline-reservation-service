import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../Hooks/useInput";
import validator from "validator";
import { login } from "../Actions/auth";
import "./AuthForm.scss";

export default function LogInForm(props) {
  const url = `${process.env.REACT_APP_API_URL}/api/user/login`;
  const dispatch = useDispatch();

  const email = useInput("");
  const password = useInput("");
  const [responseError, setResponseError] = useState("");
  const [redirect] = useState(props.redirect ? props.redirect : "/");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail() || !validatePassword()) {
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
    <form onSubmit={handleSubmit} className="loginForm">
      {responseError && <span className="responseError">{responseError}</span>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        autoComplete="username"
        onBlur={validateEmail}
        {...email.bind}
      />
      {emailError && <span className="error">{emailError}</span>}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        onBlur={validatePassword}
        {...password.bind}
      />
      {passwordError && <span className="error">{passwordError}</span>}
      <div>
        <Link
          to={{
            pathname: "/signup",
            state: {
              redirect: redirect
            }
          }}
        >
          Sign up
        </Link>
        <input type="submit" value="LOG IN" className="button" />
      </div>
    </form>
  );
}
