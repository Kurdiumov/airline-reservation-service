import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ContentContainer from "../ContentContainer";
import BookingInformation from "./BookingInformation";
import backendConnector from "../../backendConnector";

export default function Summary() {
  const token = useSelector(({ auth }) => auth.token);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    backendConnector.getMyBookings(token).then((bookings) => {
      if (!isCancelled) {
        setBookings(bookings);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (bookings === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <ContentContainer>
        <Typography
          variant="h4"
          color="secondary"
          style={{ textAlign: "center", marginTop: "32px" }}
        >
          No bookings yet :(
        </Typography>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      {bookings.map((booking) => {
        return (
          <BookingInformation
            key={booking._id}
            booking={{ ...booking }}
          ></BookingInformation>
        );
      })}
    </ContentContainer>
  );
}
