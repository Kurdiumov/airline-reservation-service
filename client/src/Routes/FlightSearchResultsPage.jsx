import React from "react";
import { Redirect } from "react-router-dom";

function FlightSearchResultsPage(props) {
  const origin = props.location.state?.origin;
  const destination = props.location.state?.destination;
  const departureDate = props.location.state?.departureDate;
  const returnDate = props.location.state?.returnDate;
  const passengers = props.location.state?.passengers;

  for (const prop of [origin, destination, departureDate, passengers]) {
    if (!prop) {
      console.error("Some mandatory property is missing in FlightSearchResultsPage");
      return <Redirect to="/" />;
    }
  }

  return (
    <div className="content">
      <h1>Search</h1>
      <p>List of flight goes here</p>
    </div>
  );
}

export default FlightSearchResultsPage;
