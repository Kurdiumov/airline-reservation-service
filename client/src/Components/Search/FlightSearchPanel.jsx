import React, { Component } from "react";
import { connect } from "react-redux";
import AirportList from "./AirportList";
import Calendar from "./Calendar";
import {
  Passengers,
  getAdultsPassengersText,
  getChildrenPassengersText,
  getInfantsPassengersText
} from "./Passengers";
import "./FlightSearchPanel.scss";

class FlightSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      originInputValue: "",
      destinationInputValue: "",
      invalid: {
        originInput: false,
        destinationInput: false,
        departureDateInput: false,
        returnDateInput: false
      }
    };
  }

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

    if (!this.props.departureDate) {
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

    this.props.handleSubmit();
  };

  setOrigin = (airport) => {
    let newState = { ...this.state };
    newState.originInputValue = airport.name;
    newState.invalid.originInput = false;
    newState.focusedInput = null;
    this.setState(newState);
    this.props.changeOrigin(airport);
  };

  setDestination = (airport) => {
    let newState = { ...this.state };
    newState.destinationInputValue = airport.name;
    newState.invalid.destinationInput = false;
    newState.focusedInput = null;
    this.setState(newState);
    this.props.changeDestination(airport);
  };

  setDepartureDate = (date) => {
    let newState = { ...this.state };
    newState.focusedInput = null;
    this.setState(newState);
    this.props.changeDepartureDate(date);
  };

  setReturnDate = (date) => {
    let newState = { ...this.state };
    newState.focusedInput = null;
    this.setState(newState);
    this.props.changeReturnDate(date);
  };

  onOriginInputChange = (event) => {
    let newState = { ...this.state };
    newState.originInputValue = event.target.value;
    newState.invalid.originInput = false;
    this.setState(newState);
    this.props.changeOrigin(null);
  };

  onDestinationInputChange = (event) => {
    let newState = { ...this.state };
    newState.destinationInputValue = event.target.value;
    newState.invalid.destinationInput = false;
    this.setState(newState);
    this.props.changeDestination(null);
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
            {getAdultsPassengersText(this.props.passengers.adults)}
            {this.props.passengers.children > 0 &&
              getChildrenPassengersText(this.props.passengers.children)}
            {this.props.passengers.infants > 0 > 0 &&
              getInfantsPassengersText(this.props.passengers.infants)}
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
      <div className="flightSearchPanel">
        {getForm()}
        {this.state.focusedInput && (
          <div className="sidePanel">
            {this.state.focusedInput === "Origin" && (
              <AirportList
                filter={this.state.originInputValue}
                sources={this.props.data.availableSources}
                airportClickHandler={this.setOrigin}
              />
            )}
            {this.state.focusedInput === "Destination" && (
              <AirportList
                filter={this.state.destinationInputValue}
                sources={this.props.data.availableDestinations}
                airportClickHandler={this.setDestination}
              />
            )}
            {this.state.focusedInput === "Passengers" && (
              <Passengers
                passengers={this.props.passengers}
                onPassengersCountChange={this.props.changePassengers}
              />
            )}
            {this.state.focusedInput === "DepartureDate" && (
              <Calendar
                departureDate={this.props.departureDate}
                setDepartureDate={this.setDepartureDate}
              />
            )}
            {this.state.focusedInput === "ReturnDate" && getReturnDatePanel()}
          </div>
        )}
      </div>
    );
  };
}

export default connect(null, {})(FlightSearchPanel);
