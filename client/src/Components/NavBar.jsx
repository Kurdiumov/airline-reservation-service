import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../Actions/auth.js";
import CurrencySelector from "./CurrencySelector";
import LocalTime from "./LocalTime";
import "./NavBar.scss";

export class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="time">
          <LocalTime />
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>|</li>
            <CurrencySelector />
          </ul>
        </div>
        <div className="authButtons">
          {this.props.isAuthenticated
            ? this.getLogOutButton()
            : this.getSignInLogInButtons()}
        </div>
      </div>
    );
  }

  getSignInLogInButtons = () => {
    return (
      <ul>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    );
  };

  getLogOutButton = () => {
    return (
      <ul>
        <li>
          <Link to="">{this.props.userName}</Link>
        </li>
        <li>|</li>
        <li>
          <Link to="" onClick={this.props.logout}>
            Log Out
          </Link>
        </li>
      </ul>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    userName: state.auth.name + " " + state.auth.surname
  };
};

const MapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, MapDispatchToProps)(NavBar);
