import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import FlightDetails from "../Components/FlightDetails";
import backendConnector from "../backendConnector.js";

class FlightSearchResultsPage extends Component {
  constructor(props) {
    super(props);

    const origin = props.origin?.code;
    const destination = props.destination?.code;
    const departureDate = props.departureDate;
    const returnDate = props.returnDate;
    const passengers = props.passengers;

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
      flights: [],
      originDetails: null,
      destinationDetails: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const { origin, destination, departureDate } = this.props;
    const date = new Date(departureDate).toISOString().substring(0, 10);

    const flightsPromise = backendConnector.getFlights(origin.code, destination.code, date);
    const originDetailsPromise = backendConnector.getAirportDetails(origin.code);
    const destinationDetailsPromise = backendConnector.getAirportDetails(destination.code);

    Promise.all([
      flightsPromise,
      originDetailsPromise,
      destinationDetailsPromise
    ]).then(([flights, originDetails, destinationDetails]) => {
      let newState = { ...this.state };
      newState.loading = false;
      newState.flights = flights;
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

const mapStateToProps = (state) => {
  return {
    origin: state.search.origin,
    destination: state.search.destination,
    departureDate: state.search.departureDate,
    returnDate: state.search.returnDate,
    passengers: {
      adults: state.search.passengers.adults,
      children: state.search.passengers.children,
      infants: state.search.passengers.infants,
    }
  };
};

export default connect(mapStateToProps, {})(FlightSearchResultsPage);
