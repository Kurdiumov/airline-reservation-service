import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import FlightDetails from "../Components/FlightDetails";
import backendConnector from "../backendConnector.js";
import moment from "moment";
import momentTimezone from "moment-timezone";
import ContentContainer from "../Components/ContentContainer";

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
    if (!departureDate?.slice)
      return;

    setLoading(true);
    const date = moment(departureDate.slice(0, 10)).format("YYYY-MM-DD");
    const flightsPromise = backendConnector.getFlights(origin, destination, date);
    const originDetailsPromise = backendConnector.getAirportDetails(origin);
    const destinationDetailsPromise = backendConnector.getAirportDetails(destination);

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
      <div className="content flightResults">
        <Loader type="Oval" color="#e67e22" />
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="content flightResults">
        <span> No results :(</span>
      </div>
    );
  }

  return (
    <ContentContainer>
      <ul>
        {flights.map((flight) => {
          return (
            <FlightDetails
              history={props.history}
              key={flight.flightNumber}
              flight={flight}
              origin={originDetails}
              destination={destinationDetails}
              passengers={passengers}
            ></FlightDetails>
          );
        })}
      </ul>
      </ContentContainer>
  );
}
