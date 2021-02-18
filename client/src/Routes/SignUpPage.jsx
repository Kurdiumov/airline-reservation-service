import React from "react";
import SignUpForm from "../Components/SignUpForm";

function SignUpPage(props) {
  return (
    <div className="content">
      <h1>Sign Up</h1>
      <SignUpForm history={props.history}></SignUpForm>
    </div>
  );
}

export default SignUpPage;
