import React, { Component } from "react";
import { connect } from "react-redux";
import FlightSearchPanel from "./FlightSearchPanel";

const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources?`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDestinations/?`;

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        availableSources: [],
        availableDestinations: []
      },
      destination: null,
      origin: null,
      departureDate: new Date(),
      returnDate: "One way",
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      }
    };

    this.getAvailableSources();
    this.getAvailableDestinations();
  }

  getAvailableSources = async () => {
    const json = await this.fetchFromBackend(availableSourcesUrl, {
      destination: this.state.destination?.code
    });

    let newState = { ...this.state };
    newState.data.availableSources = json.sources;
    this.setState(newState);
  };

  getAvailableDestinations = async () => {
    const json = await this.fetchFromBackend(availableDestinationsUrl, {
      origin: this.state.origin?.code
    });

    let newState = { ...this.state };
    newState.data.availableDestinations = json.destinations;
    this.setState(newState);
  };

  fetchFromBackend = async (url, params) => {
    try {
      const response = await fetch(url + new URLSearchParams(params));
      if (response.status === 200) {
        return await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  };

  setOrigin = (airport) => {
    let newState = { ...this.state };
    newState.origin = airport;
    this.setState(newState);
    this.getAvailableDestinations();
  };

  setDestination = (airport) => {
    let newState = { ...this.state };
    newState.destination = airport;
    this.setState(newState);
    this.getAvailableSources();
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
    const departureDate = this.state.departureDate.toISOString().slice(0, 10);
    let returnDate = null;
    if (this.state.returnDate.getTime) {
      returnDate = this.state.returnDate.toISOString().slice(0, 10);
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
      />
    );
  };
}

export default connect(null, {})(FlightSearch);
