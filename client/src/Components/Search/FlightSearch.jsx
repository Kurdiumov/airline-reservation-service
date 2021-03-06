import React, { Component } from "react";
import { connect } from "react-redux";
import AirportList from "./AirportList";
import Calendar from "./Calendar";
import backendConnector from "../../backendConnector.js";
import {
  setOrigin,
  setDestination,
  setOriginTimezone,
  setDepartureDate,
  setReturnDate
} from "../../Actions/search";
import Passengers, {
  getAdultsPassengersText,
  getChildrenPassengersText,
  getInfantsPassengersText
} from "./Passengers";
import "./FlightSearch.scss";

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      originInputValue: this.props.origin?.name ? this.props.origin.name : "",
      destinationInputValue: this.props.destination?.name
        ? this.props.destination.name
        : "",
      invalid: {
        originInput: false,
        destinationInput: false,
        departureDateInput: false,
        returnDateInput: false
      },
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
      const airportDetails = await backendConnector.getAirportDetails(
        airport.code
      );
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

  handleSubmit = async (event) => {
    event.preventDefault();

    let state = { ...this.state };

    let allInputsAreValid = true;
    if (!this.props.origin) {
      state.invalid.originInput = true;
      allInputsAreValid = false;
    }

    if (!this.props.destination) {
      state.invalid.destinationInput = true;
      allInputsAreValid = false;
    }

    if (
      !this.props.departureDate ||
      !this.state.data.availableDepartureDates.includes(
        this.props.departureDate.toISOString().substring(0, 10)
      )
    ) {
      state.invalid.departureDateInput = true;
      allInputsAreValid = false;
    }

    if (!this.props.returnDate) {
      state.invalid.returnDateInput = true;
      allInputsAreValid = false;
    }

    if (!allInputsAreValid) {
      this.setState(state);
      return;
    }

    this.props.history.push({ pathname: "/search" });
  };

  setOriginInput = (airport) => {
    let newState = { ...this.state };
    newState.originInputValue = airport.name;
    newState.invalid.originInput = false;
    newState.focusedInput = null;
    this.setState(newState);
    this.setOrigin(airport);
  };

  setDestinationInput = (airport) => {
    let newState = { ...this.state };
    newState.destinationInputValue = airport.name;
    newState.invalid.destinationInput = false;
    newState.focusedInput = null;
    this.setState(newState);
    this.setDestination(airport);
  };

  setDepartureDate = (date) => {
    let newState = { ...this.state };
    newState.focusedInput = null;
    this.setState(newState);
    this.props.setDepartureDate(date);
  };

  setReturnDate = (date) => {
    let newState = { ...this.state };
    newState.focusedInput = null;
    this.setState(newState);
    this.props.setReturnDate(date);
  };

  onOriginInputChange = (event) => {
    let newState = { ...this.state };
    newState.originInputValue = event.target.value;
    newState.invalid.originInput = false;
    this.setState(newState);
    if (this.props.origin != null) {
      this.setOrigin(null);
    }
  };

  onDestinationInputChange = (event) => {
    let newState = { ...this.state };
    newState.destinationInputValue = event.target.value;
    newState.invalid.destinationInput = false;
    this.setState(newState);
    if (this.props.destination != null) {
      this.setDestination(null);
    }
  };

  onFocusChanged = (event) => {
    let newState = { ...this.state };
    newState.focusedInput = event.currentTarget.id;
    this.setState(newState);
  };

  getPrettyDate = (date) => {
    if (date?.getTime) {
      return date.toLocaleDateString();
    }
    return date;
  };

  render = () => {
    const getForm = () => {
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="searchLocations">
            <div>
              <input
                type="text"
                id="Origin"
                placeholder="Origin"
                onInput={this.onOriginInputChange}
                onFocus={this.onFocusChanged}
                value={this.state.originInputValue}
                className={
                  this.state.invalid.originInput === true ? "invalid" : ""
                }
              />
              <span
                id="Origin"
                onClick={this.onFocusChanged}
                className="airportCode"
              >
                {this.props.origin?.code}
              </span>
            </div>
            <div>
              <input
                type="text"
                id="Destination"
                placeholder="Destination"
                onInput={this.onDestinationInputChange}
                onFocus={this.onFocusChanged}
                value={this.state.destinationInputValue}
                className={
                  this.state.invalid.destinationInput === true ? "invalid" : ""
                }
              />
              <span
                id="Destination"
                onClick={this.onFocusChanged}
                className="airportCode"
              >
                {this.props.destination?.code}
              </span>
            </div>
          </div>
          <div className="searchDates">
            <div
              id="DepartureDate"
              onClick={this.onFocusChanged}
              className={
                this.state.invalid.departureDateInput === true
                  ? "button invalid"
                  : "button"
              }
            >
              <span className="secondary">Departure</span>
              <span>{this.getPrettyDate(this.props.departureDate)}</span>
            </div>

            <div
              id="ReturnDate"
              onClick={this.onFocusChanged}
              className={
                this.state.invalid.returnDateInput === true
                  ? "button invalid"
                  : "button"
              }
            >
              <span className="secondary">Return</span>
              <span>{this.getPrettyDate(this.props.returnDate)}</span>
            </div>
          </div>

          <div
            id="Passengers"
            onClick={this.onFocusChanged}
            className={"button"}
          >
            {getAdultsPassengersText(this.props.adults)}
            {this.props.children > 0 &&
              getChildrenPassengersText(this.props.children)}
            {this.props.infants > 0 > 0 &&
              getInfantsPassengersText(this.props.infants)}
          </div>

          <input type="submit" value="Search" onFocus={this.onFocusChanged} />
        </form>
      );
    };

    const getReturnDatePanel = () => {
      return (
        <div className="sidePanel returnDate">
          Return date picker should appear here
        </div>
      );
    };

    return (
      <div className="FlightSearch">
        {getForm()}
        {this.state.focusedInput && (
          <div className="sidePanel">
            {this.state.focusedInput === "Origin" && (
              <AirportList
                filter={this.state.originInputValue}
                sources={this.state.data.availableSources}
                airportClickHandler={this.setOriginInput}
                loading={this.state.originsLoading}
              />
            )}
            {this.state.focusedInput === "Destination" && (
              <AirportList
                filter={this.state.destinationInputValue}
                sources={this.state.data.availableDestinations}
                airportClickHandler={this.setDestinationInput}
                loading={this.state.destinationsLoading}
              />
            )}
            {this.state.focusedInput === "Passengers" && <Passengers />}
            {this.state.focusedInput === "DepartureDate" && (
              <Calendar
                departureDate={this.props.departureDate}
                setDepartureDate={this.setDepartureDate}
                availableDates={this.state.data.availableDepartureDates}
              />
            )}
            {this.state.focusedInput === "ReturnDate" && getReturnDatePanel()}
          </div>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    adults: state.search.passengers.adults,
    children: state.search.passengers.children,
    infants: state.search.passengers.infants,
    departureDate: state.search.departureDate,
    returnDate: state.search.returnDate,
    origin: state.search.origin,
    destination: state.search.destination
  };
};

const MapDispatchToProps = (dispatch) => ({
  setDepartureDate: (date) => dispatch(setDepartureDate(date)),
  setReturnDate: (date) => dispatch(setReturnDate(date)),
  setOrigin: (origin) => dispatch(setOrigin(origin)),
  setDestination: (destination) => dispatch(setDestination(destination)),
  setOriginTimezone: (timezone) => dispatch(setOriginTimezone(timezone))
});

export default connect(mapStateToProps, MapDispatchToProps)(FlightSearch);
