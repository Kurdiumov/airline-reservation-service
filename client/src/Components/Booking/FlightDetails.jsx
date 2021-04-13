import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import PlaneSvg from "../../Assets/plane.svg";

import { getPriceInCurrentCurrency } from "../../utils.js";
import { setFlight, setPassengers } from "../../Actions/booking.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    "margin-top": theme.spacing(2),
    "margin-bottom": theme.spacing(4),
    padding: theme.spacing(2)
  },
  gridItem: {
    "text-align": "center"
  },
  flightNumber: {
    "margin-left": theme.spacing(1),
    "font-weight": "bold"
  },
  priceTypography: {
    margin: 0,
    padding: 0
  },
  button: {
    "margin-top": theme.spacing(1),
    "margin-bottom": theme.spacing(1)
  }
}));

export default function FlightDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );

  const handleBookBtn = (flight) => {
    const { passengers } = props;
    dispatch(setFlight(flight));

    let adults = {};
    for (let i = 0; i < passengers?.adults; i++) {
      adults["adult_" + i] = {};
    }

    let children = {};
    for (let i = 0; i < passengers?.children; i++) {
      children["child_" + i] = {};
    }

    let infants = {};
    for (let i = 0; i < passengers?.infants; i++) {
      infants["infant_" + i] = {};
    }

    dispatch(setPassengers(adults, children, infants));
    props.history.push("/booking");
  };

  const { flight, origin, destination } = props;
  return (
    <Paper className={classes.paper}>
      <Box display="flex" m={1}>
        <Typography variant="subtitle1">Flight Number:</Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          className={classes.flightNumber}
        >
          {flight.flightNumber}
        </Typography>
      </Box>
      <Divider />

      <Box display="flex" m={1}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={12} sm={4} md={4} className={classes.gridItem}>
            <div>
              {moment(flight.departureTime)
                .tz(origin.timezone)
                .format("MMMM Do YYYY, hh:mm")}
              ({moment.tz(origin.timezone).zoneName()})
            </div>
            <div>{origin.name}</div>
            <div>
              {origin.city}, {origin.country}
            </div>
            <FlightTakeoffIcon color="secondary" size="large" />
          </Grid>
          <Grid item xs={12} sm={4} md={2} className={classes.gridItem}>
            <Box display={{ xs: "none", sm: "block" }}>
              <img src={PlaneSvg} alt="Little plane" className="planeIcon" />
            </Box>
            <Typography variant="h6">{flight.duration}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} className={classes.gridItem}>
            <div>
              {moment(flight.arrivalTime)
                .tz(destination.timezone)
                .format("MMMM Do YYYY, hh:mm")}
              ({moment.tz(destination.timezone).zoneName()})
            </div>
            <div>{destination.name}</div>
            <div>
              {destination.city}, {destination.country}
            </div>
            <FlightLandIcon color="secondary" size="large" />
          </Grid>
          <Grid item xs={12} md={2} className={classes.gridItem}>
            <Box direction="column">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleBookBtn(flight)}
              >
                BOOK
              </Button>
              <Typography
                variant="subtitle2"
                className={classes.priceTypography}
              >
                Prices start at
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.priceTypography}
              >
                {getPriceInCurrentCurrency(flight.economyPrice)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
