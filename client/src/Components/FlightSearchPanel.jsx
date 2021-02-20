import React, { Component } from "react";
import { connect } from "react-redux";
import "./FlightSearchPanel.scss";

const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources`; //TODO Change endpoint

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
        destination: null
      },
      focusedInput: null
    };

    this.getAvailableSources();
    this.getAvailableDestinations();
  }

  getAvailableSources = async () => {
    const json = await this.fetchFromBackend(availableSourcesUrl);

    let newState = { ...this.state };
    newState.data.availableSources = json.sources;
    this.setState(newState);
  };

  getAvailableDestinations = async () => {
    const json = await this.fetchFromBackend(availableDestinationsUrl);

    let newState = { ...this.state };
    newState.data.availableDestinations = json.sources;
    this.setState(newState);
  };

  fetchFromBackend = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET"
      });

      if (response.status === 200) {
        return await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
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
    newState.focusedInput = null;
    this.setState(newState);
  };

  setDestination = (airport) => {
    let newState = { ...this.state };
    newState.selected.destination = airport;
    newState.destinationInputValue = airport.name;
    newState.focusedInput = null;
    this.setState(newState);
  };

  onOriginInputChange = (event) => {
    let newState = { ...this.state };
    newState.originInputValue = event.target.value;
    newState.selected.origin = null;
    this.setState(newState);
  };

  onDestinationInputChange = (event) => {
    let newState = { ...this.state };
    newState.destinationInputValue = event.target.value;
    newState.selected.destination = null;
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
    filter = filter.toLowerCase();
    const filteredSources = this.filterAvailableSources(sources, filter);

    return Object.keys(filteredSources).map((country) => {
      return (
        <li key={country}>
          <div>
            <p className="country">{country}</p>
            {this.getAirportList(filteredSources[country], filter)}
          </div>
        </li>
      );
    });
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
    newState.focusedInput = event.target.id;
    this.setState(newState);
  };

  render = () => {
    return (
      <div className="flightSearchPanel">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="searchLocations">
            <input
              type="text"
              id="Origin"
              placeholder="Origin"
              onInput={this.onOriginInputChange}
              onFocus={this.onFocusChanged}
              value={this.state.originInputValue}
            />
            <input
              type="text"
              id="Destination"
              placeholder="Destination"
              onInput={this.onDestinationInputChange}
              onFocus={this.onFocusChanged}
              value={this.state.destinationInputValue}
            />
          </div>
          <div className="searchDates">
            <input type="text" onFocus={this.onFocusChanged} />
            <input type="text" onFocus={this.onFocusChanged} />
          </div>
          <input type="text" onFocus={this.onFocusChanged} />

          <input type="submit" value="Search" onFocus={this.onFocusChanged} />
        </form>

        {this.state.focusedInput === "Origin" && (
          <div className="flightSearchLocations availableSourcesList">
            <ul>
              {this.getCountriesAndAirportsList(this.state.originInputValue, {
                ...this.state.data.availableSources
              })}
            </ul>
          </div>
        )}

        {this.state.focusedInput === "Destination" && (
          <div className="flightSearchLocations availableDestinationsList">
            <ul>
              {this.getCountriesAndAirportsList(
                this.state.destinationInputValue,
                {
                  ...this.state.data.availableDestinations
                }
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };
}

export default connect(null, {})(FlightSearchPanel);
