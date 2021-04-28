import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";

import { logout } from "../Actions/auth.js";
import CurrencySelector from "./CurrencySelector";
import LocalTime from "./LocalTime";
import LocalWeather from "./LocalWeather";
import useMobileView from "../Hooks/useMobileView";
import "./NavBar.scss";

const useStyles = makeStyles((theme) => ({
  drawerItem: {
    "text-transform": "uppercase",
    "text-align": "left",
    "padding-top": theme.spacing(1),
    "padding-bottom": theme.spacing(1)
  },
  linkItem: {
    "padding-left": theme.spacing(2),
    "justify-content": "flex-start"
  }
}));

export default function NavBar(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMobileView();
  const classes = useStyles();

  const isAuthenticated = useSelector(({ auth }) => auth.token != null);
  const userName = useSelector(({ auth }) => auth.name + " " + auth.surname);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const getMobile = () => {
    const getSignInLogInButtons = () => {
      return (
        <Container disableGutters={true}>
          <Box className={classes.drawerItem}>
            <Typography>
              <Link
                href=""
                onClick={() => history.push("/login")}
                className={classes.linkItem}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
          <Box className={classes.drawerItem}>
            <Typography>
              <Link
                href=""
                onClick={() => history.push("/signup")}
                className={classes.linkItem}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Container>
      );
    };
    const getLogOutButtons = () => {
      return (
        <Box className={classes.drawerItem}>
          <Typography>
            <Link
              href=""
              onClick={() => dispatch(logout())}
              className={classes.linkItem}
            >
              Log Out
            </Link>
          </Typography>
        </Box>
      );
    };

    return (
      <Toolbar>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          width={1}
        >
          <IconButton
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={1}
          >
            <LocalTime />
          </Box>
        </Box>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box display="flex" flexDirection="column" p={4}>
            {isAuthenticated && (
              <Box className={classes.drawerItem}>
                <Typography>{userName}</Typography>
              </Box>
            )}
            <Box className={classes.drawerItem}>
              <LocalWeather />
            </Box>
            <Divider />
            <Box className={classes.drawerItem}>
              <Typography>
                <Link
                  href=""
                  onClick={() => history.push("/")}
                  className={classes.linkItem}
                >
                  Search
                </Link>
              </Typography>
            </Box>
            <Box className={classes.drawerItem}>
              <Typography>
                <Link
                  href=""
                  onClick={() => history.push("/map")}
                  className={classes.linkItem}
                >
                  Map
                </Link>
              </Typography>
            </Box>
            <Box className={classes.drawerItem}>
              <CurrencySelector />
            </Box>
            <Divider />

            {isAuthenticated ? getLogOutButtons() : getSignInLogInButtons()}
          </Box>
        </Drawer>
      </Toolbar>
    );
  };

  const getDesktop = () => {
    const getSignInLogInButtons = () => {
      return (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mr={4}
        >
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

    const getLogOutButtons = () => {
      return (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mr={4}
        >
          <Box>
            <Button
              size="large"
              onClick={() => history.push("/mybookings")}
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
            {isAuthenticated ? getLogOutButtons() : getSignInLogInButtons()}
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  return (
    <AppBar position="static">
      {isMobile === true ? getMobile() : getDesktop()}
    </AppBar>
  );
}
