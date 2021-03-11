import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/auth.js";
import CurrencySelector from "./CurrencySelector";
import LocalTime from "./LocalTime";
import LocalWeather from "./LocalWeather";
import "./NavBar.scss";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(({ auth }) => auth.token != null);
  const userName = useSelector(({ auth }) => auth.name + " " + auth.surname);

  const getSignInLogInButtons = () => {
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

  const getLogOutButton = () => {
    return (
      <ul>
        <li>
          <Link to="">{userName}</Link>
        </li>
        <li>|</li>
        <li>
          <Link to="" onClick={() => dispatch(logout())}>
            Log Out
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="navbar">
      <div className="airportData">
        <LocalTime />
        <LocalWeather />
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
        {isAuthenticated ? getLogOutButton() : getSignInLogInButtons()}
      </div>
    </div>
  );
}
