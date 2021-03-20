import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  setAdultPassengers,
  setChildrenPassengers,
  setInfantPassengers
} from "../../Actions/search.js";

const useStyles = makeStyles((theme) => ({
  textBtn: {
    width: "200px",
    "background-color": "#fff",
    border: "1px solid rgba(239, 83, 80, 0.5) !important",
    color: theme.palette.text.primary + " !important",
    "&:hover": {
      "background-color": "#fff"
    }
  },
  secondaryText: {
    "margin-left": theme.spacing(1)
  }
}));

const passengersLimit = 8;

const getPassengersText = (count, single, plural) => {
  if (count > 1)
    return (
      <Box display="flex" alignItems="baseline">
        <Box mr={0.25}>
          <Typography variant="h6">{count}</Typography>
        </Box>
        <Box ml={0.25}>
          <Typography variant="subtitle2">{plural}</Typography>
        </Box>
      </Box>
    );
  return (
    <Box display="flex" alignItems="baseline">
      <Box mr={0.25}>
        <Typography variant="h6">{count}</Typography>
      </Box>
      <Box ml={0.25}>
        <Typography variant="subtitle2">{single}</Typography>
      </Box>
    </Box>
  );
};

export const getAdultsPassengersText = (adultsCount) => {
  return getPassengersText(adultsCount, "adult", "adults");
};

export const getChildrenPassengersText = (childrenCount) => {
  return getPassengersText(childrenCount, "child", "Children");
};

export const getInfantsPassengersText = (infantsCount) => {
  return getPassengersText(infantsCount, "infant", "infants");
};

export default function Passengers() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const adults = useSelector(({ search }) => search.passengers.adults);
  const children = useSelector(({ search }) => search.passengers.children);
  const infants = useSelector(({ search }) => search.passengers.infants);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        height="75%"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        pt={4}
      >
        <ButtonGroup
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={adults === 1 || adults === infants}
            onClick={() => dispatch(setAdultPassengers(adults - 1))}
          >
            -
          </Button>
          <Button
            className={classes.textBtn}
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={true}
          >
            <Box display="flex" justifyContent="center" alignItems="baseline">
              {getAdultsPassengersText(adults)}
              <Typography
                className={classes.secondaryText}
                color="textSecondary"
              >
                (14+)
              </Typography>
            </Box>
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={adults === passengersLimit}
            onClick={() => dispatch(setAdultPassengers(adults + 1))}
          >
            +
          </Button>
        </ButtonGroup>

        <ButtonGroup
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={children === 0}
            onClick={() => dispatch(setChildrenPassengers(children - 1))}
          >
            -
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={true}
            className={classes.textBtn}
          >
            <Box display="flex" justifyContent="center" alignItems="baseline">
              {getChildrenPassengersText(children)}
              <Typography
                className={classes.secondaryText}
                color="textSecondary"
              >
                (2-14)
              </Typography>
            </Box>
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={children === passengersLimit}
            onClick={() => dispatch(setChildrenPassengers(children + 1))}
          >
            +
          </Button>
        </ButtonGroup>

        <ButtonGroup
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={infants === 0}
            onClick={() => dispatch(setInfantPassengers(infants - 1))}
          >
            -
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={true}
            className={classes.textBtn}
          >
            <Box display="flex" justifyContent="center" alignItems="baseline">
              {getInfantsPassengersText(infants)}
              <Typography
                className={classes.secondaryText}
                color="textSecondary"
              >
                (0-2)
              </Typography>
            </Box>
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            disabled={infants === adults}
            onClick={() => dispatch(setInfantPassengers(infants + 1))}
          >
            +
          </Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" height="25%" alignItems="center">
        <Typography align="center">
          Choose passengers based on their age at the time of travel.
        </Typography>
      </Box>
    </Box>
  );
}
