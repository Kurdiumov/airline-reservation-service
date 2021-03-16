import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapPage from "./MapPage";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import BookingPage from "./BookingPage";
import FlightSearchResultsPage from "./FlightSearchResultsPage";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { makeStyles, Grid, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh"
  },
  content: {
    minHeight: "100%",
    display: "grid",
    "grid-template-rows": "auto 1fr auto",
    "grid-template-columns": "100%"
  }
});

export default function AppRouter() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Grid container direction="row" justify="center" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} className={classes.content}>
          <Grid item>
            <NavBar />
          </Grid>
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/map" component={MapPage} exact={true} />
            <Route path="/booking" component={BookingPage} exact={true} />
            <Route path="/signup" component={SignUpPage} exact={true} />
            <Route path="/login" component={LogInPage} exact={true} />
            <Route
              path="/search"
              component={FlightSearchResultsPage}
              exact={true}
            />
          </Switch>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
