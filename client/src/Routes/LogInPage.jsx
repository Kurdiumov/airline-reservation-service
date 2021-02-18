import React from "react";
import LogInForm from "../Components/LogInForm";

function LogInPage(props) {
  return (
    <div className="content">
      <h1>Log In</h1>
      <LogInForm history={props.history}></LogInForm>
    </div>
  );
}

export default LogInPage;
