import React, { Component } from "react";
import { connect } from "react-redux";
import AirportList from "./AirportList";
import Calendar from "./Calendar";
import backendConnector from "../../backendConnector.js";
import moment from "moment";
import momentTimezone from "moment-timezone";
import {
  setOrigin,
  setDestination,
  setOriginTimezone,
  setDepartureDate
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
    window.searchComponent = this;
    this.state = {
      focusedInput: null,
      originInputValue: this.props.origin?.name ? this.props.origin.name : "",
      destinationInputValue: this.props.destination?.name
        ? this.props.destination.name
        : "",
      invalid: {
        originInput: false,
        destinationInput: false,
        departureDateInput: false
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

  componentDidMount = async() => {
    await this.getAvailableSources(this.props.destination?.code);
    await this.getAvailableDestinations(this.props.origin?.code);

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
      !this.state.data.availableDepartureDates.some((date) => {
        return (
          moment(date).format("YYYY-MM-DD") ===
            moment(this.props.departureDate).format("YYYY-MM-DD") ||
          moment(date).format("YYYY-MM-DD") ===
            moment(this.props.departureDate)
              .add(24, "hours")
              .format("YYYY-MM-DD")
        );
      })
    ) {
      state.invalid.departureDateInput = true;
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
    this.props.setDepartureDate(
      //Get date from calendar without timezone offset
      moment(
        new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      ).format("YYYY-MM-DDThh:mm:ss")
    );
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

  getPrettyDate = (date, timezone = "GMT") => {
    if (date === "One way") return date;
    if (timezone) {
      return moment(date).format("YYYY-MM-DD");
    }

    return moment(date).format("YYYY-MM-DD");
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
          <div
            id="DepartureDate"
            onClick={this.onFocusChanged}
            className={
              this.state.invalid.departureDateInput === true
                ? "searchDates button invalid"
                : "searchDates button"
            }
          >
            <span className="secondary">Departure</span>
            <span>
              {this.getPrettyDate(
                this.props.departureDate,
                this.props.originTimezone
              )}
            </span>
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
                timezone={this.props.originTimezone}
                departureDate={this.props.departureDate}
                setDepartureDate={this.setDepartureDate}
                availableDates={this.state.data.availableDepartureDates.map(
                  (date) =>
                    moment(date)
                      .tz(this.props.originTimezone)
                      .format("YYYY-MM-DD")
                )}
              />
            )}
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
    origin: state.search.origin,
    destination: state.search.destination,
    originTimezone: state.search.originTimeZone
  };
};

const MapDispatchToProps = (dispatch) => ({
  setDepartureDate: (date) => dispatch(setDepartureDate(date)),
  setOrigin: (origin) => dispatch(setOrigin(origin)),
  setDestination: (destination) => dispatch(setDestination(destination)),
  setOriginTimezone: (timezone) => dispatch(setOriginTimezone(timezone))
});

export default connect(mapStateToProps, MapDispatchToProps)(FlightSearch);
