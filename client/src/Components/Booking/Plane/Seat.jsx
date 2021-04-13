import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as Icon } from "../../../Assets/Seat.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: (props) => (props.size === "large" ? "60px" : "40px"),
    height: (props) => (props.size === "large" ? "60px" : "40px"),
    padding: "0px"
  },
  seatNumber: {
    position: "absolute",
    bottom: (props) => (props.size === "large" ? "25px" : "16px"),
    color: theme.palette.text.primary,
    "font-weight": "bold",
    "font-size": (props) => (props.size === "large" ? "15px" : "10px")
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

export default function Seat(props) {
  if (!props.number) {
    throw new Error("Seat number must be provided for seat");
  }
  const classes = useStyles(props);
  

  const [number] = useState(props.number);
  const [isBusinessClass] = useState(props.businessClass ?? false);
  const [isDisabled] = useState(props.disabled ?? false);

  const getStyleClasses = () => {
    if (isDisabled) {
      return classes.seat;
    }

    if (isBusinessClass) {
      return props.selected
        ? classes["businessClass-selected"]
        : classes.businessClass;
    } else {
      return props.selected ? classes["regular-selected"] : classes.regular;
    }
  };

  const handleSeatClick = () => {
    props.onSeatSelectionChanged &&
      props.onSeatSelectionChanged(number, !props.selected);
  };

  return (
    <IconButton
      className={classes.container}
      color="primary"
      disabled={isDisabled}
      component="span"
      onClick={() => handleSeatClick()}
    >
      <Icon className={getStyleClasses()}></Icon>
      <Typography className={classes.seatNumber}>{number}</Typography>
    </IconButton>
  );
}
