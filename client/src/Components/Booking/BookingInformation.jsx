import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import TableContainer from "@material-ui/core/TableContainer";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import PlaneSvg from "../../Assets/plane.svg";
import { getPriceInCurrentCurrency } from "../../utils";

export default function BookingInformation(props) {
  const booking = props.booking;
  if (!booking) {
    throw new Error("Booking must be provided");
  }
  const adults = booking.passengers.adults;
  const children = booking.passengers.children;
  const infants = booking.passengers.infants;

  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );

  const calculatePrice = (baggageCount, isBusinessSeat) => {
    const baggagePrice = booking.baggagePrice * baggageCount;
    const seatPrice =
      isBusinessSeat === true ? booking.businessPrice : booking.economyPrice;
    return seatPrice + baggagePrice;
  };

  const getTotalPrice = () => {
    const passengersArray = Object.values(adults).concat(
      Object.values(children)
    ); //Infants should be ignored
    return passengersArray.reduce((acc, val) => {
      return acc + calculatePrice(val.baggageCount, val.isBusinessSeat);
    }, 0);
  };

  const getPassengerInfo = (passenger) => {
    return (
      <>
        <TableCell scope="row">
          {passenger.name} {passenger.surname}
        </TableCell>
        <TableCell align="right">
          {passenger.selectedSeat ? passenger.selectedSeat : "N/A"}
        </TableCell>
        <TableCell align="right">
          {passenger.selectedSeat
            ? passenger.baggageCount > 0
              ? passenger.baggageCount +
                " x " +
                getPriceInCurrentCurrency(booking.baggagePrice)
              : "-"
            : "N/A"}
        </TableCell>
        <TableCell align="right">
          {passenger.selectedSeat
            ? getPriceInCurrentCurrency(
                calculatePrice(passenger.baggageCount, passenger.isBusinessSeat)
              )
            : "N/A"}
        </TableCell>
      </>
    );
  };

  return (
    <>
      <Box m={1}>
        <Typography style={{ padding: "8px 0" }} color="secondary">
          {booking.selectedFlight}
        </Typography>
        <Divider></Divider>

        <Grid
          style={{ margin: "16px 0" }}
          container
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={4} md={5}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <div style={{ "text-align": "center" }}>
                {moment(booking.departureTime)
                  .tz(booking.originDetails.timezone)
                  .format("MMMM Do YYYY, hh:mm")}
                ({moment.tz(booking.originDetails.timezone).zoneName()})
              </div>
              <div style={{ "text-align": "center" }}>
                {booking.originDetails.name}
              </div>
              <div style={{ "text-align": "center" }}>
                {booking.originDetails.city}, {booking.originDetails.country}
              </div>
              <FlightTakeoffIcon color="secondary" size="large" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <img
              style={{ display: "block", margin: "16px auto 4px auto" }}
              src={PlaneSvg}
              alt="Little plane"
              className="planeIcon"
            />

            <Typography
              variant="h6"
              align="center"
              style={{ margin: "4px auto 16px auto" }}
            >
              {booking.flightDuration}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <div style={{ "text-align": "center" }}>
                {moment(booking.arrivalTime)
                  .tz(booking.destinationDetails.timezone)
                  .format("MMMM Do YYYY, hh:mm")}
                ({moment.tz(booking.destinationDetails.timezone).zoneName()})
              </div>
              <div style={{ "text-align": "center" }}>
                {booking.destinationDetails.name}
              </div>
              <div style={{ "text-align": "center" }}>
                {booking.destinationDetails.city},{" "}
                {booking.destinationDetails.country}
              </div>
              <FlightLandIcon color="secondary" size="large" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Seat</TableCell>
              <TableCell align="right">Baggage</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(adults).map((id) => {
              return (
                <TableRow key={id}>{getPassengerInfo(adults[id])}</TableRow>
              );
            })}
            {Object.keys(children).map((id) => {
              return (
                <TableRow key={id}>{getPassengerInfo(children[id])}</TableRow>
              );
            })}
            {Object.keys(infants).map((id) => {
              return (
                <TableRow key={id}>{getPassengerInfo(infants[id])}</TableRow>
              );
            })}
            <TableRow>
              <TableCell scope="row">
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="right">
                <Typography variant="h6">
                  {getPriceInCurrentCurrency(getTotalPrice())}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
