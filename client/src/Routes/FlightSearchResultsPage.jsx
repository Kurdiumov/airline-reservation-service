import React, { Component } from "react";
import Loader from "react-loader-spinner";
import FlightDetails from "../Components/FlightDetails";

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
  return null;
};

const getAirportDetails = async (code) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/airports/details?code=${code}`
    );
    if (response.status === 200) {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
  return null;
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
      flights: [],
      originDetails: null,
      destinationDetails: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const { origin, destination, departureDate } = this.state;
    const flightsPromise = getFlights(origin, destination, departureDate);
    const originDetailsPromise = getAirportDetails(origin);
    const destinationDetailsPromise = getAirportDetails(destination);

    Promise.all([
      flightsPromise,
      originDetailsPromise,
      destinationDetailsPromise
    ]).then(([flights, originDetails, destinationDetails]) => {
      let newState = { ...this.state };
      newState.loading = false;
      newState.flights = flights.flights;
      newState.originDetails = originDetails;
      newState.destinationDetails = destinationDetails;
      this.setState(newState);
    });
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
              <FlightDetails
                key={flight.flightNumber}
                flight={flight}
                origin={this.state.originDetails}
                destination={this.state.destinationDetails}
              ></FlightDetails>
            );
          })}
        </ul>
      </div>
    );
  };
}
export default FlightSearchResultsPage;
