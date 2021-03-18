import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import AirplanemodeInactiveIcon from "@material-ui/icons/AirplanemodeInactive";
import ContentContainer from "../Components/ContentContainer";
import FlightDetails from "../Components/Booking/FlightDetails";
import backendConnector from "../backendConnector.js";

export default function FlightSearchResultsPage(props) {
  const [flights, setFlights] = useState([]);
  const [originDetails, setOriginDetails] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const origin = useSelector((state) => state.search.origin?.code);
  const destination = useSelector((state) => state.search.destination?.code);
  const departureDate = useSelector((state) => state.search.departureDate);
  const passengers = useSelector((state) => state.search.passengers);

  useEffect(() => {
    if (!departureDate?.slice) return;

    setLoading(true);
    const date = moment(departureDate.slice(0, 10)).format("YYYY-MM-DD");
    const flightsPromise = backendConnector.getFlights(
      origin,
      destination,
      date
    );
    const originDetailsPromise = backendConnector.getAirportDetails(origin);
    const destinationDetailsPromise = backendConnector.getAirportDetails(
      destination
    );

    Promise.all([
      flightsPromise,
      originDetailsPromise,
      destinationDetailsPromise
    ]).then(([flights, originDetails, destinationDetails]) => {
      setFlights(flights);
      setOriginDetails(originDetails);
      setDestinationDetails(destinationDetails);
      setLoading(false);
    });
  }, [origin, destination, departureDate]);

  for (const prop of [origin, destination, departureDate, passengers]) {
    if (!prop) {
      console.warn(
        "Some mandatory property is missing in FlightSearchResultsPage, redirecting..."
      );
      return <Redirect to="/" />;
    }
  }

  if (loading === true) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80%"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <Box pb={2}>
          <AirplanemodeInactiveIcon fontSize="large" />
        </Box>
        <Typography variant="h4">No flights found </Typography>
      </Box>
    );
  }

  return (
    <ContentContainer>
      {flights.map((flight) => {
        return (
          <FlightDetails
            key={flight.flightNumber}
            history={props.history}
            flight={flight}
            origin={originDetails}
            destination={destinationDetails}
            passengers={passengers}
          ></FlightDetails>
        );
      })}
    </ContentContainer>
  );
}
