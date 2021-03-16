import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Grid, Button, Divider } from "@material-ui/core";
import { logout } from "../Actions/auth.js";
import CurrencySelector from "./CurrencySelector";
import LocalTime from "./LocalTime";
import LocalWeather from "./LocalWeather";

export default function NavBar(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(({ auth }) => auth.token != null);
  const userName = useSelector(({ auth }) => auth.name + " " + auth.surname);

  const getSignInLogInButtons = () => {
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" mr={4}>
        <Box>
          <Button
            size="large"
            onClick={() => history.push("/signup")}
            disableRipple
            disableFocusRipple
          >
            Sign Up
          </Button>
        </Box>
        <Box>
          <Button
            size="large"
            onClick={() => history.push("/login")}
            disableRipple
            disableFocusRipple
          >
            Sign In
          </Button>
        </Box>
      </Box>
    );
  };

  const getLogOutButton = () => {
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" mr={4}>
        <Box>
          <Button
            size="large"
            onClick={() => history.push("/#")}
            disableRipple
            disableFocusRipple
          >
            {userName}
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Button
            size="large"
            onClick={() => dispatch(logout())}
            disableRipple
            disableFocusRipple
          >
            Log Out
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          width="100%"
        >
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              ml={4}
            >
              <Box mr={1}>
                <LocalTime />
              </Box>
              <Box ml={1}>
                <LocalWeather />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Box>
                <Button
                  size="large"
                  onClick={() => history.push("/")}
                  disableRipple
                  disableFocusRipple
                >
                  Search
                </Button>
              </Box>
              <Box>
                <Button
                  size="large"
                  onClick={() => history.push("/map")}
                  disableRipple
                  disableFocusRipple
                >
                  Map
                </Button>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <CurrencySelector />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            {isAuthenticated ? getLogOutButton() : getSignInLogInButtons()}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
