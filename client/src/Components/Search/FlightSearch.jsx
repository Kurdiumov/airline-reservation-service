import React, { Component } from "react";
import { connect } from "react-redux";
import FlightSearchPanel from "./FlightSearchPanel";
import backendConnector from "../../backendConnector.js";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        availableSources: [],
        availableDestinations: [],
        availableDepartureDates: []
      },
      destination: null,
      origin: null,
      departureDate: new Date(),
      returnDate: "One way",
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      },
      originsLoading: true,
      destinationsLoading: true,
      departureDatesLoading: true
    };
  }

  componentDidMount() {
    this.getAvailableSources();
    this.getAvailableDestinations();
  }

  getAvailableSources = async (destinationCode) => {
    let newState = { ...this.state };
    newState.originsLoading = true;
    this.setState(newState);

    const sources = await backendConnector.getAvailableSources(destinationCode);

    newState = { ...this.state };
    newState.data.availableSources = sources;
    newState.originsLoading = false;
    this.setState(newState);
  };

  getAvailableDestinations = async (originCode) => {
    let newState = { ...this.state };
    newState.destinationsLoading = true;
    this.setState(newState);

    const destinations = await backendConnector.getAvailableDestinations(originCode);

    newState = { ...this.state };
    newState.data.availableDestinations = destinations;
    newState.destinationsLoading = false;
    this.setState(newState);
  };

  getAvailableDepartureDates = async (originCode, destinationCode) => {
    if (!originCode || !destinationCode) {
      return;
    }

    let newState = { ...this.state };
    newState.departureDatesLoading = true;
    this.setState(newState);

    const dates = await backendConnector.getAvailableDepartureDates(originCode, destinationCode);

    newState = { ...this.state };
    newState.data.availableDepartureDates = dates;
    newState.departureDatesLoading = false;
    this.setState(newState);
  };

  setOrigin = async (airport) => {
    let newState = { ...this.state };
    newState.origin = airport;
    await this.setState(newState);
    this.getAvailableDestinations(airport?.code);
    this.getAvailableDepartureDates(
      this.state.origin?.code,
      this.state.destination?.code
    );
  };

  setDestination = async (airport) => {
    let newState = { ...this.state };
    newState.destination = airport;
    await this.setState(newState);
    this.getAvailableSources(airport?.code);
    this.getAvailableDepartureDates(
      this.state.origin?.code,
      this.state.destination?.code
    );
  };

  setDepartureDate = (date) => {
    let newState = { ...this.state };
    newState.departureDate = date;
    this.setState(newState);
  };

  setReturnDate = (date) => {
    let newState = { ...this.state };
    newState.returnDate = date;
    this.setState(newState);
  };

  setPassengers = (passengers) => {
    let newState = { ...this.state };
    newState.passengers = passengers;
    this.setState(newState);
  };

  onSubmit = () => {
    const departureDate = (new Date(this.state.departureDate)).toISOString().substring(0, 10);
    let returnDate = null;
    if (this.state.returnDate.getTime) {
      returnDate = (new Date(this.state.returnDate)).toISOString().substring(0, 10)
    }

    this.props.history.push({
      pathname: "/search",
      state: {
        origin: this.state.origin.code,
        destination: this.state.destination.code,
        departureDate: departureDate,
        returnDate: returnDate,
        passengers: {
          adults: this.state.passengers.adults,
          children: this.state.passengers.children,
          infants: this.state.passengers.infants
        }
      }
    });
  };

  render = () => {
    return (
      <FlightSearchPanel
        data={this.state.data}
        origin={this.state.origin}
        destination={this.state.destination}
        departureDate={this.state.departureDate}
        returnDate={this.state.returnDate}
        passengers={this.state.passengers}
        changeOrigin={this.setOrigin}
        changeDestination={this.setDestination}
        changeDepartureDate={this.setDepartureDate}
        changeReturnDate={this.setReturnDate}
        changePassengers={this.setPassengers}
        handleSubmit={this.onSubmit}
        originsLoading={this.state.originsLoading}
        destinationsLoading={this.state.destinationsLoading}
      />
    );
  };
}

export default connect(null, {})(FlightSearch);
