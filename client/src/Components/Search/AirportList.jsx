import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "./AirportList.scss";

class AirportList extends Component {
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

  getAirportList = (country) => {
    return country.map((airport) => {
      return (
        <span
          key={airport.code}
          className="airport"
          onClick={this.onAirportClick}
        >
          <p className="airportName">{airport.name}</p>
          <p className="airportCode"> {airport.code}</p>
        </span>
      );
    });
  };

  onAirportClick = (event) => {
    const airportCode = event.currentTarget.getElementsByClassName(
      "airportCode"
    )[0].innerText;
    const airportName = event.currentTarget.getElementsByClassName(
      "airportName"
    )[0].innerText;

    this.props.airportClickHandler({
      name: airportName,
      code: airportCode
    });
  };

  render = () => {
    if (this.props.loading === true) {
      return (
        <div className="airportsList loader">
          <Loader type="Oval" color="#5f9ea0" />
        </div>
      );
    }

    return (
      <div className="airportsList">
        {this.getCountriesAndAirportsList(this.props.filter, {
          ...this.props.sources
        })}
      </div>
    );
  };
}

export default AirportList;
