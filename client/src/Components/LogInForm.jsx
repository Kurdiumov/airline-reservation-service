import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import validator from 'validator';
import "./AuthForm.scss";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.url = `${process.env.REACT_APP_API_URL}/api/user/login`;

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
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

    this.validateEmail();
    this.validatePassword();

    if (this.state.errors.email || this.state.errors.password) {
      return;
    }

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });

      let newState = { ...this.state };
      if (response.status === 200) {
        console.log(
          "Login successful, auth-token:",
          response.headers.get("auth-token")
        );
        
        // TODO Set Token
        console.warn("set token here");

        newState.redirect = "/";
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

  validateEmail = () => {
    let newState = { ...this.state };
    newState.errors.email = validator.isEmail(this.state.email) ? "": "Email is not valid.";
    this.setState(newState);
  };

  validatePassword = () => {
    let newState = { ...this.state };
    newState.errors.password = !validator.isEmpty(this.state.password) ? "": "Password must be provided.";
    this.setState(newState);
  };

  render = () => {
    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;
     
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
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
        { errors.email && <span className="error">{errors.email}</span> }
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          onChange={this.handleChange}
          onBlur={this.validatePassword}
          value={this.state.name}
        />
        { errors.password && <span className="error">{errors.password}</span> }
        <div>
          <Link to="/signup">Sign up</Link>
          <input type="submit" value="LOG IN" className="button" />
        </div>
      </form>
    );
  };
}

export default LogInForm;
