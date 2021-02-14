import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.scss";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.url = `${process.env.REACT_APP_API_URL}/api/user/login`;

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (event) => {
    let newState = { ...this.state };
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // TODO Validate input
    console.warn("TODO: Validate input");

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(this.state)
      });

      if (response.status === 200) {
        console.log(
          "Login successful, auth-token:",
          response.headers.get("auth-token")
        );
        // TODO Redirect
        console.warn("redirect here");
        // TODO Set Token
        console.warn("set token here");
        return;
      }
      throw new Error(response.statusText);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <div>
          <Link to="/signup">Sign up</Link>
          <input type="submit" value="LOG IN" className="button" />
        </div>
      </form>
    );
  };
}

export default LogInForm;
