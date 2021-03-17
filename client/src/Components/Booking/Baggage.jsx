import React from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Badge
} from "@material-ui/core";
import { getPriceInCurrentCurrency } from "../../utils";
import baggage from "../../Assets/baggage.png";
import baggageDisabled from "../../Assets/baggage-disabled.png";
import "./Booking.scss";

const useStyles = makeStyles({
  button: {
    width: 30,
    height: 30,
    "min-width": 30,
    "min-height": 30,
    "border-radius": 30,
    "font-weight": "bold"
  }
});

export default function Passenger(props) {
  const classes = useStyles();
  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );
  const handleRemoveBaggage = () => {
    if (props.count <= 0) {
      return;
    }
    props.changeCount(props.count - 1);
  };

  const handleAddBaggage = () => {
    if (props.count >= 6) {
      return;
    }
    props.changeCount(props.count + 1);
  };

  return (
    <Box className="baggage">
      <Divider />
      <Box mt={2} ml={4}>
        <Typography variant="h5">BAGGAGE</Typography>
      </Box>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          {props.count === 0 ? (
            <img src={baggageDisabled} alt="Baggage" />
          ) : (
            <Badge badgeContent={"x" + props.count} color="secondary">
              <img src={baggage} alt="Baggage" />
            </Badge>
          )}
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              onClick={handleRemoveBaggage}
              disableRipple
              disableFocusRipple
              disabled={props.count <= 0 ? true : false}
              size="small"
            >
              -
            </Button>
          </Grid>
          <Grid item>
            <Typography>
              {getPriceInCurrentCurrency(props.pricePerItem)} per item
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              disableRipple
              disableFocusRipple
              onClick={handleAddBaggage}
              disabled={props.count >= 6 ? true : false}
              size="small"
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
