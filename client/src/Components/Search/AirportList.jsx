import React from "react";
import Loader from "react-loader-spinner";
import "./AirportList.scss";

export default function AirportList(props) {
  const getCountriesAndAirportsList = (filter, sources) => {
    filter = filter.toLowerCase().trim();
    const filteredSources = filterAvailableSources(sources, filter);

    const result = Object.keys(filteredSources).map((country) => {
      return (
        <li key={country}>
          <div>
            <p className="country">{country}</p>
            {getAirportList(filteredSources[country], filter)}
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

  const filterAvailableSources = (sources, filter) => {
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

  const getAirportList = (country) => {
    return country.map((airport) => {
      return (
        <span
          key={airport.code}
          className="airport"
          onClick={handleAirportClick}
        >
          <p className="airportName">{airport.name}</p>
          <p className="airportCode"> {airport.code}</p>
        </span>
      );
    });
  };

  const handleAirportClick = (event) => {
    const airportCode = event.currentTarget.getElementsByClassName("airportCode")[0].innerText;
    const airportName = event.currentTarget.getElementsByClassName("airportName")[0].innerText;

    props.airportClickHandler({
      name: airportName,
      code: airportCode
    });
  };

  if (props.loading === true) {
    return (
      <div className="airportsList loader">
        <Loader type="Oval" color="#e67e22" />
      </div>
    );
  }

  return (
    <div className="airportsList">
      {getCountriesAndAirportsList(props.filter, {
        ...props.sources
      })}
    </div>
  );
}
