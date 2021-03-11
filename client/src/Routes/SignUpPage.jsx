import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignUpForm from "../Components/SignUpForm";

export default function SignUpPage(props) {
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="content">
      <h1>Sign Up</h1>
      <SignUpForm history={props.history}></SignUpForm>
    </div>
  );
}
