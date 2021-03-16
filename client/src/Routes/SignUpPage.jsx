import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";
import SignUpForm from "../Components/SignUpForm";
import ContentContainer from "../Components/ContentContainer";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

export default function SignUpPage(props) {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <ContentContainer>
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.grid}>
        <Paper className={classes.paper}>
          <Typography variant="h4">Sign Up</Typography>
          <SignUpForm history={props.history}></SignUpForm>
        </Paper>
      </Grid>
    </ContentContainer>
  );
}
