import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import FlightDetails from "../Components/FlightDetails";
import backendConnector from "../backendConnector.js";
import moment from "moment";
import momentTimezone from "moment-timezone";

class FlightSearchResultsPage extends Component {
  constructor(props) {
    super(props);

    const origin = props.origin?.code;
    const destination = props.destination?.code;
    const departureDate = props.departureDate;
    const passengers = props.passengers;

    for (const prop of [origin, destination, departureDate, passengers]) {
      if (!prop) {
        console.warn(
          "Some mandatory property is missing in FlightSearchResultsPage, redirecting..."
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
    if (window.location.pathname.toLowerCase() !== "/search") {
      return;
    }

    const { origin, destination, departureDate } = this.props;
    const date = moment(departureDate.slice(0, 10)).format("YYYY-MM-DD");

    const flightsPromise = backendConnector.getFlights(
      origin.code,
      destination.code,
      date
    );
    const originDetailsPromise = backendConnector.getAirportDetails(
      origin.code
    );
    const destinationDetailsPromise = backendConnector.getAirportDetails(
      destination.code
    );

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
    if (!this.state || this.state.loading === true) {
      return (
        <div className="content flightResults">
          <Loader type="Oval" color="#e67e22" />
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
    originTimezone: state.search.originTimeZone,
    destination: state.search.destination,
    departureDate: state.search.departureDate,
    passengers: {
      adults: state.search.passengers.adults,
      children: state.search.passengers.children,
      infants: state.search.passengers.infants
    }
  };
};

export default connect(mapStateToProps, {})(FlightSearchResultsPage);
