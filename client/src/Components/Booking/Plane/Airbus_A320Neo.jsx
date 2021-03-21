import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Seat from "./Seat";
import Box from "@material-ui/core/Box";
import airbus_a320neoSvg from "../../../Assets/Airbus_A320Neo.svg";

const useStyles = makeStyles((theme) => ({
  seats: {
    position: "absolute",
    top: "380px",
    left: "45px"
  }
}));

export default function Airbus_A320Neo(props) {
  const classes = useStyles();

  const [unavailableSeats] = useState(props.unavailableSeats ?? []);

  const getSeat = (seatNumber, isBusiness = false) => {
    return (
      <Seat
        businessClass={isBusiness}
        disabled={unavailableSeats.includes(seatNumber)}
        number={seatNumber}
        onSeatSelectionChanged={props.onSeatSelectionChanged}
      ></Seat>
    );
  };

  const get4SeatsRow = (rowNumber) => {
    return (
      <>
        <Box width="40%" display="flex" justifyContent="space-between">
          {getSeat(rowNumber + "A", true)}
          {getSeat(rowNumber + "C", true)}
        </Box>
        <Box width="40%" display="flex" justifyContent="space-between">
          {getSeat(rowNumber + "D", true)}
          {getSeat(rowNumber + "F", true)}
        </Box>
      </>
    );
  };

  const get6SeatsRow = (rowNumber) => {
    return (
      <>
        <Box>
          {getSeat(rowNumber + "A", false)}
          {getSeat(rowNumber + "B", false)}
          {getSeat(rowNumber + "C", false)}
        </Box>
        <Box>
          {getSeat(rowNumber + "D", false)}
          {getSeat(rowNumber + "E", false)}
          {getSeat(rowNumber + "F", false)}
        </Box>
      </>
    );
  };

  const populateBusinessSeats = () => {
    return (
      <Box>
        {[...Array(5)].map((e, i) => {
          return (
            <Box
              display="flex"
              key={i + 1}
              justifyContent="space-between"
              ml={1}
              mr={1}
              mb={1.8}
            >
              {get4SeatsRow(i + 1)}
            </Box>
          );
        })}
      </Box>
    );
  };

  const populateSeats = () => {
    return (
      <Box mt={6}>
        {[...Array(5)].map((e, i) => {
          return (
            <Box
              display="flex"
              key={i + 6}
              justifyContent="space-between"
              mb={1.8}
            >
              {get6SeatsRow(i + 6)}
            </Box>
          );
        })}
        <Box display="flex" justifyContent="space-between" mt={12} mb={1.8}>
          {get6SeatsRow(11)}
        </Box>

        <Box display="flex" justifyContent="space-between" mt={11} mb={1.8}>
          {get6SeatsRow(12)}
        </Box>

        <Box mt={2}>
          {[...Array(4)].map((e, i) => {
            return (
              <Box
                display="flex"
                key={i + 14}
                justifyContent="space-between"
                mb={1.85}
              >
                {get6SeatsRow(i + 14)}
              </Box>
            );
          })}
        </Box>

        <Box mt={2}>
          {[...Array(14)].map((e, i) => {
            return (
              <Box
                display="flex"
                key={i + 25}
                justifyContent="space-between"
                mb={1.85}
              >
                {get6SeatsRow(i + 25)}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box position="relative">
        <img width="490px" src={airbus_a320neoSvg} alt="Airbus_A320Neo" />;
        <Box
          display="flex"
          flexDirection="column"
          className={classes.seats}
          width="400px"
        >
          {populateBusinessSeats()}
          {populateSeats()}
        </Box>
      </Box>
    </>
  );
}
