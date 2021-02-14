import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import NavBar from "../Components/NavBar";

const AppRouter = () => {
  return (
    <HashRouter>
      <div className="app">
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/signup" component={SignUpPage} exact={true} />
          <Route path="/login" component={LogInPage} exact={true} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
