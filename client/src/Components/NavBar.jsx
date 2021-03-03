import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../Actions/auth.js";
import "./NavBar.scss";

export class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>|</li>
          {this.props.isAuthenticated
            ? this.getLogOutButton()
            : this.getSignInLogInButtons()}
        </ul>
      </div>
    );
  }

  getSignInLogInButtons = () => {
    return (
      <div>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </div>
    );
  };

  getLogOutButton = () => {
    return (
      <div>
        <li>
          <Link to="" onClick={this.props.logout}>
            Log Out
          </Link>
        </li>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const MapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, MapDispatchToProps)(NavBar);
