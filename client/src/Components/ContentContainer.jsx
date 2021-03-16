import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2)
  }
}));

export default function ContentContainer(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} justify="center">
      <Grid item xs={12} sm={10} md={6}>
        {props.children}
      </Grid>
    </Grid>
  );
}