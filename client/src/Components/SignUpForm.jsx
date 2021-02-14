import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      repeatedPassword: ""
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
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          surname: this.state.surname,
          password: this.state.password
        })
      });

      if (response.status === 201) {
        const json = await response.json();
        console.log("Register successful, response:", json);
        // TODO Redirect
        console.warn("redirect to login here");
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

        <label htmlFor="name">First name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />

        <label htmlFor="surname">Last name:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          onChange={this.handleChange}
          value={this.state.lsurnameastName}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          onChange={this.handleChange}
          value={this.state.password}
        />

        <label htmlFor="repeatedPassword">Repeat password:</label>
        <input
          type="password"
          id="repeatedPassword"
          name="repeatedPassword"
          autoComplete="on"
          onChange={this.handleChange}
          value={this.state.repeatedPassword}
        />
        <div>
          <Link to="/login">Sign in</Link>
          <input type="submit" value="SIGN UP" className="button" />
        </div>
      </form>
    );
  };
}

export default SignUpForm;
