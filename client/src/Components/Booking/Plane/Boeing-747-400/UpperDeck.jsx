import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Seat from "../Seat";
import Box from "@material-ui/core/Box";
import boeing_747_400_upper_deck from "../../../../Assets/Planes/Boeing-747-400-upper-deck.svg";

const useStyles = makeStyles(() => ({
  seats: {
    position: "absolute",
    top: "450px",
    left: "62px"
  }
}));

export default function UpperDeck(props) {
  const classes = useStyles();

  const [unavailableSeats] = useState(props.unavailableSeats ?? []);

  const populateSeats = () => {
    const getSeat = (seatNumber) => {
      return (
        <Seat
          size="large"
          businessClass={true}
          disabled={unavailableSeats.includes(seatNumber)}
          selected={props.selectedSeats.includes(seatNumber)}
          number={seatNumber}
          onSeatSelectionChanged={props.onSeatSelectionChanged}
        ></Seat>
      );
    };

    const get2Seats = (rowNumber, side, width) => {
      return (
        <>
          <Box width={width} display="flex" justifyContent="space-around">
            {getSeat(rowNumber + (side === "left" ? "A" : "J"))}
            {getSeat(rowNumber + (side === "left" ? "B" : "K"))}
          </Box>
        </>
      );
    };

    const populateHead = () => {
      return (
        <>
          {[...Array(2)].map((e, i) => {
            const rowNumber = i + 11;
            return (
              <Box
                key={rowNumber}
                display="flex"
                justifyContent="space-between"
                mb={12}
              >
                {get2Seats(rowNumber, "left", "40%")}
                {get2Seats(rowNumber, "right", "40%")}
              </Box>
            );
          })}
          {[...Array(2)].map((e, i) => {
            const rowNumber = i + 14;
            return (
              <Box
                key={rowNumber}
                display="flex"
                justifyContent="space-between"
                mb={11}
              >
                {get2Seats(rowNumber, "left", "40%")}
                {get2Seats(rowNumber, "right", "40%")}
              </Box>
            );
          })}
        </>
      );
    };

    const populateTail = () => {
      return (
        <>
          <Box
            mt={22}
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Box width="45%" display="flex" flexDirection="column">
              {[...Array(4)].map((e, i) => {
                const rowNumber = i + 16;
                return (
                  <Box
                    key={rowNumber}
                    display="flex"
                    justifyContent="space-between"
                    mb={12}
                  >
                    {get2Seats(rowNumber, "left", "100%")}
                  </Box>
                );
              })}
            </Box>
            <Box width="45%" mt={10} display="flex" flexDirection="column">
              {[...Array(4)].map((e, i) => {
                const rowNumber = i + 16;
                return (
                  <Box
                    key={rowNumber}
                    display="flex"
                    justifyContent="space-between"
                    mb={9.5}
                  >
                    {get2Seats(rowNumber, "right", "100%")}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </>
      );
    };

    return (
      <>
        {populateHead()}
        {populateTail()}
      </>
    );
  };

  return (
    <Box>
      <Box mt={2.5} position="relative">
        <img
          width="550px"
          src={boeing_747_400_upper_deck}
          alt="Boeing 747-400 Main Deck"
        />
        ;
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
