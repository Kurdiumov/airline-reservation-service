import React, { Component } from "react";
import Loader from "react-loader-spinner";

const getFlights = async (origin, destination, date) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/flights?origin=${origin}&destination=${destination}&date=${date}`
    );
    if (response.status === 200) {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
};

class FlightSearchResultsPage extends Component {
  constructor(props) {
    super(props);

    const origin = props.location.state?.origin;
    const destination = props.location.state?.destination;
    const departureDate = props.location.state?.departureDate;
    const returnDate = props.location.state?.returnDate;
    const passengers = props.location.state?.passengers;

    for (const prop of [origin, destination, departureDate, passengers]) {
      if (!prop) {
        console.error(
          "Some mandatory property is missing in FlightSearchResultsPage"
        );
        props.history.push("/");
        return;
      }
    }
    this.state = {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      loading: true
    };
  }

  componentDidMount = async () => {
    const response = await getFlights(
      this.state.origin,
      this.state.destination,
      this.state.departureDate
    );
    let newState = { ...this.state };
    newState.loading = false;
    newState.flights = response.flights;
    this.setState(newState);
  };

  render = () => {
    if (this.state.loading === true) {
      return (
        <div className="content flightResults">
          <Loader type="Oval" color="#5f9ea0" />
        </div>
      );
    }

    if (this.state.flights.length === 0) {
      return (
        <div className="content flightResults">
          <span> No results :(</span>
        </div>
      );
    }

    return (
      <div className="content">
          <ul>
            {this.state.flights.map((flight) => {
              return (
                <li key={flight._id}>
                  #{flight.flightNumber} {flight.origin} - {flight.destination}{" "}
                  ({flight.departureTime}:{flight.arrivalTime})
                </li>
              );
            })}
          </ul>
      </div>
    );
  };
}
export default FlightSearchResultsPage;
