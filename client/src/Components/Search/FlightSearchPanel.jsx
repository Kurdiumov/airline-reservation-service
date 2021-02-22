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

const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources?`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDestinations/?`;

class FlightSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        availableSources: [],
        availableDestinations: []
      },
      originInputValue: "",
      destinationInputValue: "",
      selected: {
        origin: null,
        destination: null,
        returnDate: "One way",
        departureDate: new Date(),
        passengers: {
          adults: 1,
          children: 0,
          infants: 0
        }
      },
      invalid: {
        originInput: false,
        destinationInput: false,
        departureDateInput: false,
        returnDateInput: false
      },
      focusedInput: null
    };

    this.getAvailableSources();
    this.getAvailableDestinations();
  }

  getAvailableSources = async () => {
    const json = await this.fetchFromBackend(availableSourcesUrl, {
      destination: this.state.selected.destination?.code
    });

    let newState = { ...this.state };
    newState.data.availableSources = json.sources;
    this.setState(newState);
  };

  getAvailableDestinations = async () => {
    const json = await this.fetchFromBackend(availableDestinationsUrl, {
      origin: this.state.selected.origin?.code
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

  handleSubmit = async (event) => {
    event.preventDefault();

    let state = { ...this.state };

    let allInputsAreValid = true;
    if (!state.selected.origin) {
      state.invalid.originInput = true;
      allInputsAreValid = false;
    }

    if (!state.selected.destination) {
      state.invalid.destinationInput = true;
      allInputsAreValid = false;
    }

    if (!state.selected.departureDate) {
      state.invalid.departureDateInput = true;
      allInputsAreValid = false;
    }

    if (!state.selected.returnDate) {
      state.invalid.returnDateInput = true;
      allInputsAreValid = false;
    }

    if (!allInputsAreValid) {
      this.setState(state);
      return;
    }

    // ToDo: Redirect to search page
    console.warn("Should redirect to search page here...");
  };

  setOrigin = (airport) => {
    let newState = { ...this.state };
    newState.selected.origin = airport;
    newState.originInputValue = airport.name;
    newState.invalid.originInput = false;
    newState.focusedInput = null;
    this.setState(newState);

    this.getAvailableDestinations();
  };

  setDestination = (airport) => {
    let newState = { ...this.state };
    newState.selected.destination = airport;
    newState.destinationInputValue = airport.name;
    newState.invalid.destinationInput = false;
    newState.focusedInput = null;
    this.setState(newState);

    this.getAvailableSources();
  };

  setDepartureDate = (date) => {
    let newState = { ...this.state };
    newState.selected.departureDate = date;
    newState.focusedInput = null;
    this.setState(newState);
  };

  setReturnDate = (date) => {
    let newState = { ...this.state };
    newState.selected.departureDate = date;
    newState.focusedInput = null;
    this.setState(newState);
  };

  onOriginInputChange = (event) => {
    let newState = { ...this.state };
    newState.originInputValue = event.target.value;
    newState.invalid.originInput = false;
    newState.selected.origin = null;
    this.setState(newState);

    this.getAvailableDestinations();
  };

  onDestinationInputChange = (event) => {
    let newState = { ...this.state };
    newState.destinationInputValue = event.target.value;
    newState.invalid.destinationInput = false;
    newState.selected.destination = null;
    this.setState(newState);

    this.getAvailableSources();
  };

  onFocusChanged = (event) => {
    let newState = { ...this.state };
    newState.focusedInput = event.currentTarget.id;
    this.setState(newState);
  };

  handlePassengersCountChange = (state) => {
    let newState = { ...this.state };
    newState.selected.passengers = state;
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
                {this.state.selected.origin?.code}
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
                {this.state.selected.destination?.code}
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
              <span>
                {this.getPrettyDate(this.state.selected.departureDate)}
              </span>
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
              <span>{this.getPrettyDate(this.state.selected.returnDate)}</span>
            </div>
          </div>

          <div
            id="Passengers"
            onClick={this.onFocusChanged}
            className={"button"}
          >
            {getAdultsPassengersText(this.state.selected.passengers.adults)}
            {this.state.selected.passengers.children > 0 &&
              getChildrenPassengersText(
                this.state.selected.passengers.children
              )}
            {this.state.selected.passengers.infants > 0 > 0 &&
              getInfantsPassengersText(this.state.selected.passengers.infants)}
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
                sources={this.state.data.availableSources}
                airportClickHandler={this.setOrigin}
              />
            )}
            {this.state.focusedInput === "Destination" && (
              <AirportList
                filter={this.state.destinationInputValue}
                sources={this.state.data.availableDestinations}
                airportClickHandler={this.setDestination}
              />
            )}
            {this.state.focusedInput === "Passengers" && (
              <Passengers
                passengers={this.state.selected.passengers}
                onPassengersCountChange={this.handlePassengersCountChange}
              />
            )}
            {this.state.focusedInput === "DepartureDate" && (
              <Calendar
                departureDate={this.state.selected.departureDate}
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
