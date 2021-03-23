import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Seat from "../Seat";
import Box from "@material-ui/core/Box";
import boeing_747_400_main_deck from "../../../../Assets/Planes/Boeing-747-400-main-deck.svg";

const useStyles = makeStyles((theme) => ({
  seats: {
    position: "absolute",
    top: "380px",
    left: "62px"
  }
}));

export default function MainDeck(props) {
  const classes = useStyles();
  const [unavailableSeats] = useState(props.unavailableSeats ?? []);

  const populateSeats = () => {
    const getSeat = (seatNumber, isBusiness = false, size = "standard") => {
      return (
        <Seat
          size={size}
          businessClass={isBusiness}
          disabled={unavailableSeats.includes(seatNumber)}
          number={seatNumber}
          onSeatSelectionChanged={props.onSeatSelectionChanged}
        ></Seat>
      );
    };

    const get2RoyalSeats = (
      firstSeatNumber,
      secondSeatNumber,
      rotateDegree = 0
    ) => {
      return (
        <>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-around"
            style={{ transform: `rotate(${rotateDegree}deg)` }}
          >
            {getSeat(firstSeatNumber, true, "large")}
            {getSeat(secondSeatNumber, true, "large")}
          </Box>
        </>
      );
    };

    const getSeatsRow = (seatNumbers) => {
      return (
        <>
          <Box display="flex" justifyContent="space-around">
            {seatNumbers.map((number) => {
              return <div key={number}>{getSeat(number, false)}</div>;
            })}
          </Box>
        </>
      );
    };

    const createRoyalFirstClass = () => {
      return (
        <Box>
          <Box ml={1} mr={1} display="flex" justifyContent="space-between">
            <Box>{get2RoyalSeats("1A", "1B", 15)}</Box>
            <Box>{get2RoyalSeats("1J", "1K", -15)}</Box>
          </Box>
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>{get2RoyalSeats("2A", "2B", 10)}</Box>
            <Box>{get2RoyalSeats("2J", "2K", -10)}</Box>
          </Box>
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>{get2RoyalSeats("4A", "4B", 5)}</Box>
            <Box>{get2RoyalSeats("4J", "4K", -5)}</Box>
          </Box>
          <Box mt={1.5} display="flex" justifyContent="center">
            <Box>{get2RoyalSeats("4E", "4F", 0)}</Box>
          </Box>
        </Box>
      );
    };

    const createBusinessClass = () => {
      return (
        <Box display="flex" mt={18} width="66%" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            {[...Array(5)].map((e, i) => {
              const rowNumber = i + 22;
              return (
                <Box
                  mt={4}
                  key={rowNumber}
                  display="flex"
                  justifyContent="space-between"
                >
                  {get2RoyalSeats(rowNumber + "A", rowNumber + "B", 0)}
                </Box>
              );
            })}
          </Box>
          <Box display="flex" mt={16} flexDirection="column">
            {[...Array(4)].map((e, i) => {
              const rowNumber = i + 23;
              return (
                <Box
                  mt={4}
                  key={rowNumber}
                  display="flex"
                  justifyContent="space-between"
                >
                  {get2RoyalSeats(rowNumber + "A", rowNumber + "B", 0)}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    const createHeadEconomyClass = () => {
      return (
        <Box mt={34} display="flex" justifyContent="space-between">
          <Box display="flex" width="25%" flexDirection="column">
            {[...Array(12)].map((e, i) => {
              const row = i + 31;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "A", row + "B", row + "C"])}
                </Box>
              );
            })}
          </Box>
          <Box mt={28.75} display="flex" width="33%" flexDirection="column">
            {[...Array(8)].map((e, i) => {
              const row = i + 35;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "D", row + "E", row + "F", row + "G"])}
                </Box>
              );
            })}
          </Box>
          <Box mt={7} display="flex" width="25%" flexDirection="column">
            {[...Array(11)].map((e, i) => {
              const row = i + 32;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "H", row + "J", row + "K"])}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    const createMiddleEconomyClass = () => {
      return (
        <Box mt={25} display="flex" justifyContent="space-between">
          <Box display="flex" width="25%" flexDirection="column">
            {[...Array(10)].map((e, i) => {
              const row = i + 43;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "A", row + "B", row + "C"])}
                </Box>
              );
            })}
          </Box>
          <Box mt={14.5} display="flex" width="33%" flexDirection="column">
            {[...Array(7)].map((e, i) => {
              const row = i + 45;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "D", row + "E", row + "F", row + "G"])}
                </Box>
              );
            })}
          </Box>
          <Box display="flex" width="25%" flexDirection="column">
            {[...Array(10)].map((e, i) => {
              const row = i + 43;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "H", row + "J", row + "K"])}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    const createTailEconomyClass = () => {
      return (
        <Box mt={22} display="flex" justifyContent="space-between">
          <Box display="flex" width="25%" flexDirection="column">
            {[...Array(5)].map((e, i) => {
              const row = i + 53;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "A", row + "B", row + "C"])}
                </Box>
              );
            })}

            {[...Array(7)].map((e, i) => {
              const row = i + 61;
              return (
                <Box mb={2.4} key={row}>
                  {getSeatsRow([row + "A", row + "B", row + "C"])}
                </Box>
              );
            })}

            {[...Array(3)].map((e, i) => {
              const row = i + 68;
              return (
                <Box
                  mr={-1}
                  mb={2.4}
                  key={row}
                  display="flex"
                  justifyContent="flex-end"
                >
                  {getSeatsRow([row + "A", row + "B"])}
                </Box>
              );
            })}
          </Box>
          <Box mt={22} display="flex" width="33%" flexDirection="column">
            {[...Array(2)].map((e, i) => {
              const row = i + 56;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "D", row + "E", row + "F", row + "G"])}
                </Box>
              );
            })}

            {[...Array(11)].map((e, i) => {
              const row = i + 61;
              return (
                <Box mb={2.4} key={row}>
                  {getSeatsRow([row + "D", row + "E", row + "F", row + "G"])}
                </Box>
              );
            })}
          </Box>
          <Box display="flex" width="25%" flexDirection="column">
            {[...Array(5)].map((e, i) => {
              const row = i + 53;
              return (
                <Box mb={2.25} key={row}>
                  {getSeatsRow([row + "H", row + "J", row + "K"])}
                </Box>
              );
            })}

            {[...Array(7)].map((e, i) => {
              const row = i + 61;
              return (
                <Box mb={2.4} key={row}>
                  {getSeatsRow([row + "H", row + "J", row + "K"])}
                </Box>
              );
            })}

            {[...Array(3)].map((e, i) => {
              const row = i + 68;
              return (
                <Box
                  ml={-1}
                  mb={2.4}
                  key={row}
                  display="flex"
                  justifyContent="flex-start"
                >
                  {getSeatsRow([row + "J", row + "K"])}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    return (
      <>
        {createRoyalFirstClass()}
        {createBusinessClass()}
        {createHeadEconomyClass()}
        {createMiddleEconomyClass()}
        {createTailEconomyClass()}
      </>
    );
  };

  return (
    <Box>
      <Box position="relative">
        <img
          width="550px"
          src={boeing_747_400_main_deck}
          alt="Boeing 747-400 Main Deck"
        />
        <Box
          display="flex"
          flexDirection="column"
          className={classes.seats}
          width="425px"
        >
          {populateSeats()}
        </Box>
      </Box>
    </Box>
  );
}
