import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EventSeatIcon from "@material-ui/icons/EventSeat";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "60px",
    height: "60px",
    padding: "0px"
  },
  seat: {
    "font-size": "60px",
    transform: "rotate(180deg)"
  },
  seatAvailable: {
    color: "#43a047"
  },
  seatSelected: {
    color: "#76d275"
  },
  businessClassSeatAvailable: {
    color: "#ffa000"
  },
  businessClassSeatSelected: {
    color: "#ffd149"
  },
  seatNumber: {
    position: "absolute",
    color: theme.palette.text.primary,
    bottom: "13px",
    "font-weight": "bold",
    "font-size": "10px"
  }
}));

export default function FlightDetails(props) {
  if (!props.number) {
    throw new Error("Seat number must be provided for seat");
  }

  const classes = useStyles();

  const [number] = useState(props.number);
  const [isBusinessClass] = useState(props.businessClass ?? false);
  const [isDisabled] = useState(props.disabled ?? false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    props.onSeatSelectionChanged &&
      props.onSeatSelectionChanged(number, isSelected);
  }, [isSelected]);

  const getSeatStyles = () => {
    let seatStyle = `${classes.seat} `;

    if (!isDisabled) {
      if (isBusinessClass) {
        seatStyle += isSelected
          ? classes.businessClassSeatSelected
          : classes.businessClassSeatAvailable;
      } else {
        seatStyle += isSelected ? classes.seatSelected : classes.seatAvailable;
      }
    }

    return seatStyle;
  };

  return (
    <IconButton
      className={classes.container}
      color="primary"
      disabled={isDisabled}
      component="span"
      onClick={() => setIsSelected(!isSelected)}
    >
      <EventSeatIcon className={getSeatStyles()} />
      <Typography className={classes.seatNumber}>{number}</Typography>
    </IconButton>
  );
}
