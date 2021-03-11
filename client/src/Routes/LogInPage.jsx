import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LogInForm from "../Components/LogInForm";

export default function LogInPage(props) {
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="content">
      <h1>Log In</h1>
      <LogInForm
        history={props.history}
        redirect={props.location.state?.redirect}
      ></LogInForm>
    </div>
  );
}
