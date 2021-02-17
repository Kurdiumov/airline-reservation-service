import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import validator from "validator";
import "./AuthForm.scss";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.url = `${process.env.REACT_APP_API_URL}/api/user/register`;

    this.state = {
      email: "",
      name: "",
      surname: "",
      password: "",
      repeatedPassword: "",
      errors: {
        email: "",
        name: "",
        surname: "",
        password: "",
        repeatedPassword: ""
      },
      responseError: "",
      redirect: false
    };
  }

  handleChange = (event) => {
    let newState = { ...this.state };
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.validateInputs()) {
      return;
    }

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          surname: this.state.surname,
          password: this.state.password
        })
      });

      let newState = { ...this.state };
      if (response.status === 201) {
        const json = await response.json();
        console.log("Register successful, response:", json);
        
        newState.redirect = "/login";
        this.setState(newState);
        return;
      }

      const responseText = await response.text();
      newState.responseError = responseText;
      this.setState(newState);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  validateInputs = () => {
    let newState = { ...this.state };
    newState.errors = {
      email: this.getEmailError(this.state.email),
      name: this.getNameError(this.state.name),
      surname: this.getSurnameError(this.state.surname),
      password: this.getPasswordError(this.state.password),
      repeatedPassword: this.getRepeatedPasswordError(
        this.state.repeatedPassword
      )
    };
    this.setState(newState);

    return Object.values(newState.errors).some((x) => {
      return x !== null && x !== undefined && x !== "";
    });
  };

  validateEmail = () => {
    let newState = { ...this.state };
    newState.errors.email = this.getEmailError(this.state.email);
    this.setState(newState);
  };

  getEmailError = (email) => {
    if (validator.isEmpty(email)) return "Email must be provided.";

    if (!validator.isEmail(email)) return "Email is not valid.";

    if (!validator.isLength(email, { min: 6, max: 255 })) {
      if (validator.isLength(email, { min: 0, max: 6 }))
        return "Email is too short.";
      return "Email is too long.";
    }

    return "";
  };

  validateName = () => {
    let newState = { ...this.state };
    newState.errors.name = this.getNameError();
    this.setState(newState);
  };

  getNameError = () => {
    if (validator.isEmpty(this.state.name))
      return "First name must be provided.";

    if (!validator.isLength(this.state.name, { min: 6, max: 255 })) {
      if (validator.isLength(this.state.name, { min: 0, max: 6 }))
        return "First name is too short.";
      return "First name is too long.";
    }

    return "";
  };

  validateSurname = () => {
    let newState = { ...this.state };
    newState.errors.surname = this.getSurnameError();
    this.setState(newState);
  };

  getSurnameError = () => {
    if (validator.isEmpty(this.state.surname))
      return "Last name must be provided.";

    if (!validator.isLength(this.state.surname, { min: 6, max: 255 })) {
      if (validator.isLength(this.state.surname, { min: 0, max: 6 }))
        return "Last name is too short.";
      return "Last name is too long.";
    }

    return "";
  };

  validatePassword = () => {
    let newState = { ...this.state };
    newState.errors.password = this.getPasswordError();
    if (this.state.repeatedPassword) {
      newState.errors.repeatedPassword = this.getRepeatedPasswordError();
    }
    this.setState(newState);
  };

  getPasswordError = () => {
    if (validator.isEmpty(this.state.password))
      return "Password must be provided.";

    if (validator.isLength(this.state.password, { min: 0, max: 5 }))
      return "Password is too short. Minimum password length is 6 characters.";

    if (validator.isLength(this.state.password, { min: 255, max: undefined }))
      return "Password is too long.";

    return "";
  };

  validateRepeatedPassword = () => {
    let newState = { ...this.state };
    newState.errors.repeatedPassword = this.getRepeatedPasswordError();
    if (this.state.password) {
      newState.errors.password = this.getPasswordError();
    }
    this.setState(newState);
  };

  getRepeatedPasswordError = () => {
    if (validator.isEmpty(this.state.repeatedPassword))
      return "Please repeat password.";

    if (
      this.state.password &&
      this.state.password !== this.state.repeatedPassword
    ) {
      return "Passwords don't match.";
    }

    return "";
  };

  render = () => {
    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;
    
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="signUpForm">
        {this.state.responseError && <span className="responseError">{this.state.responseError}</span>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.handleChange}
          onBlur={this.validateEmail}
          value={this.state.email}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="name">First name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={this.handleChange}
          onBlur={this.validateName}
          value={this.state.name}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="surname">Last name:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          onChange={this.handleChange}
          onBlur={this.validateSurname}
          value={this.state.surname}
        />
        {errors.surname && <span className="error">{errors.surname}</span>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          onChange={this.handleChange}
          onBlur={this.validatePassword}
          value={this.state.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label htmlFor="repeatedPassword">Repeat password:</label>
        <input
          type="password"
          id="repeatedPassword"
          name="repeatedPassword"
          autoComplete="on"
          onChange={this.handleChange}
          onBlur={this.validateRepeatedPassword}
          value={this.state.repeatedPassword}
        />
        {errors.repeatedPassword && <span className="error">{errors.repeatedPassword}</span>}

        <div>
          <Link to="/login">Sign in</Link>
          <input type="submit" value="SIGN UP" className="button" />
        </div>
      </form>
    );
  };
}

export default SignUpForm;
