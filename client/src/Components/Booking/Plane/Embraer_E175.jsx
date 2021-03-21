import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Seat from "./Seat";
import Box from "@material-ui/core/Box";
import embraer_e175svg from "../../../Assets/Embraer_E175.svg";

const useStyles = makeStyles((theme) => ({
  seats: {
    position: "absolute",
    top: "410px",
    left: "217px"
  }
}));

export default function Embraer_E175(props) {
  const classes = useStyles();
  const businessClassRows = 4;
  const premiumClassRows = 3;
  const regularSeatsRows = 12;

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

  const get3SeatsRow = (rowNumber) => {
    return (
      <>
        <Box>{getSeat(rowNumber + "A", true)}</Box>
        <Box display="flex" width="50%" justifyContent="space-between">
          {getSeat(rowNumber + "B", true)}
          {getSeat(rowNumber + "C", true)}
        </Box>
      </>
    );
  };

  const get4SeatsRow = (rowNumber) => {
    return (
      <>
        <Box>
          {getSeat(rowNumber + "A", false)}
          {getSeat(rowNumber + "B", false)}
        </Box>
        <Box>
          {getSeat(rowNumber + "C", false)}
          {getSeat(rowNumber + "D", false)}
        </Box>
      </>
    );
  };

  const populateBusinessSeats = () => {
    return (
      <Box>
        {[...Array(businessClassRows)].map((e, i) => {
          return (
            <Box
              display="flex"
              key={i + 1}
              justifyContent="space-between"
              ml={1}
              mr={1}
              mb={4}
            >
              {get3SeatsRow(i + 1)}
            </Box>
          );
        })}
      </Box>
    );
  };

  const populatePremiumSeats = () => {
    return (
      <Box mt={1}>
        {[...Array(premiumClassRows)].map((e, i) => {
          const rowNumber = i + businessClassRows + 2;
          return (
            <Box
              display="flex"
              key={rowNumber}
              justifyContent="space-between"
              mb={0.5}
            >
              {get4SeatsRow(rowNumber)}
            </Box>
          );
        })}
      </Box>
    );
  };

  const populateSeats = () => {
    return (
      <Box mt={1.5}>
        {[...Array(regularSeatsRows)].map((e, i) => {
          const rowNumber = i + businessClassRows + premiumClassRows + 2;
          return (
            <Box
              display="flex"
              key={rowNumber}
              justifyContent="space-between"
              mb={0.4}
            >
              {get4SeatsRow(rowNumber)}
            </Box>
          );
        })}
        <Box display="flex" justifyContent="space-around">
          {get4SeatsRow(
            regularSeatsRows + premiumClassRows + businessClassRows + 2
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box position="relative">
        <img width="700px" src={embraer_e175svg} alt="Embraer_E175" />;
        <Box
          display="flex"
          flexDirection="column"
          className={classes.seats}
          width="268px"
        >
          {populateBusinessSeats()}
          {populatePremiumSeats()}
          {populateSeats()}
        </Box>
      </Box>
    </>
  );
}
