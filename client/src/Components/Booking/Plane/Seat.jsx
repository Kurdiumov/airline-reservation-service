import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as Icon } from "../../../Assets/Seat.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "40px",
    height: "40px",
    padding: "0px"
  },
  seatNumber: {
    position: "absolute",
    bottom: "16px",
    color: theme.palette.text.primary,
    "font-weight": "bold",
    "font-size": "10px"
  },
  seat: {
    "& path": {
      fill: "#dfe0e0"
    }
  },
  regular: {
    "& path": {
      fill: "#43a047"
    }
  },
  businessClass: {
    "& path": {
      fill: "#ffa000"
    }
  },
  "regular-selected": {
    "& path": {
      fill: "#76d275"
    }
  },
  "businessClass-selected": {
    "& path": {
      fill: "#ffd149"
    }
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

  const getStyleClasses = () => {
    if (isDisabled) {
      return classes.seat;
    }

    if (isBusinessClass) {
      return isSelected ? classes["businessClass-selected"] : classes.businessClass;
    } else {
      return isSelected ? classes["regular-selected"] : classes.regular;
    }
  };

  return (
    <IconButton
      className={classes.container}
      color="primary"
      disabled={isDisabled}
      component="span"
      onClick={() => setIsSelected(!isSelected)}
    >
      <Icon className={getStyleClasses()}></Icon>
      <Typography className={classes.seatNumber}>{number}</Typography>
    </IconButton>
  );
}