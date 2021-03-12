import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import useInput from "../Hooks/useInput";
import "./AuthForm.scss";

export default function SignUpForm(props) {
  const url = `${process.env.REACT_APP_API_URL}/api/user/register`;
  const email = useInput("");
  const name = useInput("");
  const surname = useInput("");
  const password = useInput("");
  const repeatedPassword = useInput("");

  const [responseError, setResponseError] = useState("");
  const [errors, setErrors] = useState({
    errors: {
      email: "",
      name: "",
      surname: "",
      password: "",
      repeatedPassword: ""
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateInputs()) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          surname: surname.value,
          password: password.value
        })
      });

      if (response.status === 201) {
        const json = await response.json();
        console.log("Register successful, response:", json);

        props.history.push("/login");
        return;
      }

      const responseText = await response.text();
      setResponseError(responseText);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const validateInputs = () => {
    setErrors({
      email: getEmailError(),
      name: getNameError(),
      surname: getSurnameError(),
      password: getPasswordError(),
      repeatedPassword: getRepeatedPasswordError()
    });

    return Object.values(errors).some((x) => {
      return x !== null && x !== undefined && x !== "";
    });
  };

  const validateEmail = () => {
    setErrors({ ...errors, email: getEmailError() });
  };

  const getEmailError = () => {
    if (validator.isEmpty(email.value)) return "Email must be provided.";

    if (!validator.isEmail(email.value)) return "Email is not valid.";

    if (!validator.isLength(email.value, { min: 6, max: 255 })) {
      if (validator.isLength(email.value, { min: 0, max: 6 }))
        return "Email is too short.";
      return "Email is too long.";
    }

    return "";
  };

  const validateName = () => {
    setErrors({ ...errors, name: getNameError() });
  };

  const getNameError = () => {
    if (validator.isEmpty(name.value)) return "First name must be provided.";

    if (!validator.isLength(name.value, { min: 6, max: 255 })) {
      if (validator.isLength(name.value, { min: 0, max: 6 }))
        return "First name is too short.";
      return "First name is too long.";
    }

    return "";
  };

  const validateSurname = () => {
    setErrors({ ...errors, surname: getSurnameError() });
  };

  const getSurnameError = () => {
    if (validator.isEmpty(surname.value)) return "Last name must be provided.";

    if (!validator.isLength(surname.value, { min: 6, max: 255 })) {
      if (validator.isLength(surname.value, { min: 0, max: 6 }))
        return "Last name is too short.";
      return "Last name is too long.";
    }

    return "";
  };

  const validatePassword = () => {
    let newState = { ...errors, password: getPasswordError() };

    if (repeatedPassword.value) {
      newState.repeatedPassword = getRepeatedPasswordError();
    }
    setErrors(newState);
  };

  const getPasswordError = () => {
    if (validator.isEmpty(password.value)) return "Password must be provided.";

    if (validator.isLength(password.value, { min: 0, max: 5 }))
      return "Password is too short. Minimum password length is 6 characters.";

    if (validator.isLength(password.value, { min: 255, max: undefined }))
      return "Password is too long.";

    return "";
  };

  const validateRepeatedPassword = () => {
    let newState = { ...errors, repeatedPassword: getRepeatedPasswordError() };

    if (password.value) {
      newState.password = getPasswordError();
    }
    setErrors(newState);
  };

  const getRepeatedPasswordError = () => {
    if (validator.isEmpty(repeatedPassword.value)) return "Please repeat password.";

    if (password.value && password.value !== repeatedPassword.value) {
      return "Passwords don't match.";
    }

    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="signUpForm">
      {responseError && <span className="responseError">{responseError}</span>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="username"
        onBlur={validateEmail}
        {...email.bind}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <label htmlFor="name">First name:</label>
      <input
        type="text"
        autoComplete="given-name"
        onBlur={validateName}
        {...name.bind}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <label htmlFor="surname">Last name:</label>
      <input
        type="text"
        autoComplete="family-name"
        onBlur={validateSurname}
        {...surname.bind}
      />
      {errors.surname && <span className="error">{errors.surname}</span>}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        autoComplete="new-password"
        onBlur={validatePassword}
        {...password.bind}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <label htmlFor="repeatedPassword">Repeat password:</label>
      <input
        type="password"
        autoComplete="new-password"
        onBlur={validateRepeatedPassword}
        {...repeatedPassword.bind}
      />
      {errors.repeatedPassword && (<span className="error">{errors.repeatedPassword}</span>)}

      <div>
        <Link to="/login">Sign in</Link>
        <input type="submit" value="SIGN UP" className="button" />
      </div>
    </form>
  );
}
