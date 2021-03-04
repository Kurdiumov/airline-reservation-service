import React, { Component } from "react";
import { connect } from "react-redux";
import FlightSearchPanel from "./FlightSearchPanel";
import backendConnector from "../../backendConnector.js";
import { setOrigin, setDestination, setOriginTimezone} from "../../Actions/search.js";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        availableSources: [],
        availableDestinations: [],
        availableDepartureDates: []
      },
      originsLoading: true,
      destinationsLoading: true,
      departureDatesLoading: true
    };
  }

  componentDidMount() {
    this.getAvailableSources(this.props.destination?.code);
    this.getAvailableDestinations(this.props.origin?.code);

    this.getAvailableDepartureDates(
      this.props.origin?.code,
      this.props.destination?.code
    );
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

    const destinations = await backendConnector.getAvailableDestinations(
      originCode
    );

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

    const dates = await backendConnector.getAvailableDepartureDates(
      originCode,
      destinationCode
    );

    newState = { ...this.state };
    newState.data.availableDepartureDates = dates;
    newState.departureDatesLoading = false;
    this.setState(newState);
  };

  setOrigin = async (airport) => {
    await this.props.setOrigin(airport);

    if (airport) {
      const airportDetails = await backendConnector.getAirportDetails(airport.code);
      await this.props.setOriginTimezone(airportDetails.timezone);
    }

    this.getAvailableDestinations(airport?.code);
    this.getAvailableDepartureDates(
      this.props.origin?.code,
      this.props.destination?.code
    );
  };

  setDestination = async (airport) => {
    await this.props.setDestination(airport);
    this.getAvailableSources(airport?.code);
    this.getAvailableDepartureDates(
      this.props.origin?.code,
      this.props.destination?.code
    );
  };

  onSubmit = () => {
    this.props.history.push({pathname: "/search" });
  };

  render = () => {
    return (
      <FlightSearchPanel
        data={this.state.data}
        changeOrigin={this.setOrigin}
        changeDestination={this.setDestination}
        handleSubmit={this.onSubmit}
        originsLoading={this.state.originsLoading}
        destinationsLoading={this.state.destinationsLoading}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    origin: state.search.origin,
    destination: state.search.destination
  };
};

const MapDispatchToProps = (dispatch) => ({
  setOrigin: (origin) => dispatch(setOrigin(origin)),
  setDestination: (destination) => dispatch(setDestination(destination)),
  setOriginTimezone: (timezone) => dispatch(setOriginTimezone(timezone))
});

export default connect(mapStateToProps, MapDispatchToProps)(FlightSearch);
