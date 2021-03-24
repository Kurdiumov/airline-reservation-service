import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plane from "./Plane/Plane";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

export default function SeatSelection(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const aircraftModel = useSelector(({ booking }) => booking.aircraftModel);
  const selectedFlight = useSelector(({ booking }) => booking.selectedFlight);

  const [unavailableSeats, setUnavailableSeats] = useState(null);

  useEffect(() => {
    //TODO Send request to backend for fetching available seats
    setTimeout(() => {
      setUnavailableSeats(["1A", "1B", "11A"]);
    }, 1000);
  }, []);

  if (unavailableSeats == null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Container className="booking" disableGutters={true}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Box display="flex" flexDirection="column" width="100%">
              Passengers list should appear here
              <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
                <Button
                  
                  variant="contained"
                  color="primary"
                  disabled={true}
                >
                  Book & Pay
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Plane model={aircraftModel} unavailableSeats={unavailableSeats} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
