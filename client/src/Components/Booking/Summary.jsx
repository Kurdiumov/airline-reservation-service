import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../ContentContainer";
import BookingInformation from "./BookingInformation";
import backendConnector from "../../backendConnector";

export default function Summary() {
  const history = useHistory();
  const booking = useSelector((state) => state.booking);
  const token = useSelector(({auth}) => auth.token);

  const transformPassenger = (passenger, type) => {
    return {
      "name": passenger.name,
      "surname": passenger.surname,
      "sex": passenger.sex,
      "type": type,
      "seat": passenger.selectedSeat,
      "baggage": passenger.baggageCount,
      "isBusinessSeat": passenger.isBusinessSeat
    }
  }

  const handleBookingButton = async () => {
    let adults = Object.values(booking.passengers.adults).map((passenger) => transformPassenger(passenger, "adult"));
    let children = Object.values(booking.passengers.children).map((passenger) => transformPassenger(passenger, "child"));
    let infants = Object.values(booking.passengers.infants).map((passenger) => transformPassenger(passenger, "infant"));

    await backendConnector.createBooking(booking.selectedFlight, token, adults.concat(children).concat(infants))
    history.push("/");
  }
  
  return (
    <ContentContainer>
      <Paper>
      <Typography variant="h5" color="primary" align="center" style={{padding: "8px 0 0 0"}}>Summary</Typography>
        <Box m={3}>
          <BookingInformation booking={booking} />
          <Box mt={5} pb={5} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={() => history.push("/")}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleBookingButton}>
              Book & go to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </ContentContainer>
  );
}
