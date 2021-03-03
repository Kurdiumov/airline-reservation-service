import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapPage from "./MapPage";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import FlightSearchResultsPage from "./FlightSearchResultsPage";
import NavBar from "../Components/NavBar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/map" component={MapPage} exact={true} />
          <Route path="/signup" component={SignUpPage} exact={true} />
          <Route path="/login" component={LogInPage} exact={true} />
          <Route
            path="/search"
            component={FlightSearchResultsPage}
            exact={true}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
