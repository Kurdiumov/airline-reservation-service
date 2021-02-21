import React, { Component } from "react";
import { connect } from "react-redux";
import "./FlightSearchPanel.scss";

const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources?`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDestinations/?`;
const passengersLimit = 8;

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
        returnDate: null,
        departureDate: null,
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
    console.log("Sending stuff!");

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
  };

  airportClicked = (event) => {
    const airportCode = event.currentTarget.getElementsByClassName(
      "airportCode"
    )[0].innerText;
    const airportName = event.currentTarget.getElementsByClassName(
      "airportName"
    )[0].innerText;

    if (this.state.focusedInput === "Origin") {
      this.setOrigin({
        name: airportName,
        code: airportCode
      });
    } else if (this.state.focusedInput === "Destination") {
      this.setDestination({
        name: airportName,
        code: airportCode
      });
    } else {
      throw new Error("How you clicked on airport if list is not visible?!");
    }
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

  onAdultPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 1) return;

    let newState = { ...this.state };
    newState.selected.passengers.adults = newValue;
    this.setState(newState);
  };

  onChildPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 0) return;

    let newState = { ...this.state };
    newState.selected.passengers.children = newValue;
    this.setState(newState);
  };

  onInfantPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 0) return;
    if (newValue > this.state.selected.passengers.adults) return;

    let newState = { ...this.state };
    newState.selected.passengers.infants = newValue;
    this.setState(newState);
  };

  filterAvailableSources = (sources, filter) => {
    let filtered = {};

    Object.keys(sources).forEach((country) => {
      if (country.toLowerCase().startsWith(filter)) {
        filtered[country] = sources[country];
        return;
      }

      const filteredAirports = sources[country].filter(
        (airport) =>
          airport.name.toLowerCase().includes(filter) ||
          airport.code.toLowerCase().includes(filter)
      );

      if (filteredAirports.length > 0) {
        filtered[country] = filteredAirports;
      }
    });

    return filtered;
  };

  getCountriesAndAirportsList = (filter, sources) => {
    filter = filter.toLowerCase().trim();
    const filteredSources = this.filterAvailableSources(sources, filter);

    const result = Object.keys(filteredSources).map((country) => {
      return (
        <li key={country}>
          <div>
            <p className="country">{country}</p>
            {this.getAirportList(filteredSources[country], filter)}
          </div>
        </li>
      );
    });
    if (result.length === 0) {
      return (
        <div className="noResults">
          There are no results based on your criteria :(
        </div>
      );
    }
    return <ul>{result}</ul>;
  };

  getAirportList = (country) => {
    return country.map((airport) => {
      return (
        <span
          key={airport.code}
          className="airport"
          onClick={this.airportClicked}
        >
          <p className="airportName">{airport.name}</p>
          <p className="airportCode"> {airport.code}</p>
        </span>
      );
    });
  };

  onFocusChanged = (event) => {
    let newState = { ...this.state };
    newState.focusedInput = event.currentTarget.id;
    this.setState(newState);
  };

  getAdultsPassengersText = () => {
    const adultsCount = this.state.selected.passengers.adults;
    if (adultsCount > 1)
      return (
        <span>
          {adultsCount}
          <span className="secondary"> adults </span>
        </span>
      );
    return (
      <span>
        {adultsCount}
        <span className="secondary"> adult </span>
      </span>
    );
  };

  getChildrenPassengersText = () => {
    const childrenCount = this.state.selected.passengers.children;
    if (childrenCount > 1)
      return (
        <span>
          {childrenCount}
          <span className="secondary"> children </span>
        </span>
      );
    return (
      <span>
        {childrenCount}
        <span className="secondary"> child </span>
      </span>
    );
  };

  getInfantsPassengersText = () => {
    const infantsCount = this.state.selected.passengers.infants;
    if (infantsCount > 1)
      return (
        <span>
          {infantsCount}
          <span className="secondary"> infants </span>
        </span>
      );
    return (
      <span>
        {infantsCount}
        <span className="secondary"> infant </span>
      </span>
    );
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
            <input
              type="text"
              onFocus={this.onFocusChanged}
              className={
                this.state.invalid.departureDateInput === true ? "invalid" : ""
              }
            />
            <input
              type="text"
              onFocus={this.onFocusChanged}
              className={
                this.state.invalid.returnDateInput === true ? "invalid" : ""
              }
            />
          </div>

          <div
            id="Passengers"
            onClick={this.onFocusChanged}
            className={"button"}
          >
            {this.getAdultsPassengersText()}
            {this.state.selected.passengers.children > 0 &&
              this.getChildrenPassengersText()}
            {this.state.selected.passengers.infants > 0 > 0 &&
              this.getInfantsPassengersText()}
          </div>

          <input type="submit" value="Search" onFocus={this.onFocusChanged} />
        </form>
      );
    };

    const getPassengersPanel = () => {
      return (
        <div className="sidePanel passengers">
          <div>
            <button
              className={
                this.state.selected.passengers.adults === 1 ||
                this.state.selected.passengers.adults ===
                  this.state.selected.passengers.infants
                  ? "disabled"
                  : ""
              }
              onClick={() =>
                this.onAdultPassengersCountChange(
                  this.state.selected.passengers.adults - 1
                )
              }
            >
              -
            </button>
            <span>
              {this.getAdultsPassengersText()}
              <span className="secondary"> (14+)</span>
            </span>
            <button
              className={
                this.state.selected.passengers.adults === passengersLimit
                  ? "disabled"
                  : ""
              }
              onClick={() =>
                this.onAdultPassengersCountChange(
                  this.state.selected.passengers.adults + 1
                )
              }
            >
              +
            </button>
          </div>

          <div>
            <button
              className={
                this.state.selected.passengers.children === 0 ? "disabled" : ""
              }
              onClick={() =>
                this.onChildPassengersCountChange(
                  this.state.selected.passengers.children - 1
                )
              }
            >
              -
            </button>
            <span>
              {this.getChildrenPassengersText()}
              <span className="secondary"> (2-14)</span>
            </span>
            <button
              className={
                this.state.selected.passengers.children === passengersLimit
                  ? "disabled"
                  : ""
              }
              onClick={() =>
                this.onChildPassengersCountChange(
                  this.state.selected.passengers.children + 1
                )
              }
            >
              +
            </button>
          </div>

          <div>
            <button
              className={
                this.state.selected.passengers.infants === 0 ? "disabled" : ""
              }
              onClick={() =>
                this.onInfantPassengersCountChange(
                  this.state.selected.passengers.infants - 1
                )
              }
            >
              -
            </button>
            <span>
              {this.getInfantsPassengersText()}
              <span className="secondary"> (0-2)</span>
            </span>
            <button
              className={
                this.state.selected.passengers.infants ===
                this.state.selected.passengers.adults
                  ? "disabled"
                  : ""
              }
              onClick={() =>
                this.onInfantPassengersCountChange(
                  this.state.selected.passengers.infants + 1
                )
              }
            >
              +
            </button>
          </div>
          <p>Choose passengers based on their age at the time of travel.</p>
        </div>
      );
    };

    return (
      <div className="flightSearchPanel">
        {getForm()}
        {this.state.focusedInput === "Origin" && (
          <div className="sidePanel airportsList">
            {this.getCountriesAndAirportsList(this.state.originInputValue, {
              ...this.state.data.availableSources
            })}
          </div>
        )}

        {this.state.focusedInput === "Destination" && (
          <div className="sidePanel airportsList">
            {this.getCountriesAndAirportsList(
              this.state.destinationInputValue,
              {
                ...this.state.data.availableDestinations
              }
            )}
          </div>
        )}

        {this.state.focusedInput === "Passengers" && getPassengersPanel()}
      </div>
    );
  };
}

export default connect(null, {})(FlightSearchPanel);
