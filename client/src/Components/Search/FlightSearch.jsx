import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AirportList from "./AirportList";
import Calendar from "./Calendar";
import moment from "moment";
import momentTimezone from "moment-timezone";
import {
  setOrigin,
  setDestination,
  setDepartureDate,
  setFocusedInput
} from "../../Actions/search";
import Passengers, {
  getAdultsPassengersText,
  getChildrenPassengersText,
  getInfantsPassengersText
} from "./Passengers";
import "./FlightSearch.scss";

export default function FlightSearch(props) {
  const dispatch = useDispatch();
  
  const origin = useSelector(({ search }) => search.origin);
  const destination = useSelector(({ search }) => search.destination);
  const departureDate = useSelector(({ search }) => search.departureDate);
  const adults = useSelector(({ search }) => search.passengers.adults);
  const children = useSelector(({ search }) => search.passengers.children);
  const infants = useSelector(({ search }) => search.passengers.infants);
  const originTimezone = useSelector(({ search }) => search.originTimezone);
  const focusedInput = useSelector(({search}) => search.focusedInput);
  const availableSources = useSelector(({data}) => data.availableSources);
  const availableDestinations = useSelector(({data}) => data.availableDestinations);
  const availableDates = useSelector(({data}) => data.availableDates);
  const originsLoading = useSelector(({data}) => data.originsLoading);
  const destinationsLoading = useSelector(({data}) => data.destinationsLoading);
  const datesLoading = useSelector(({data}) => data.datesLoading);

  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [invalid, setInvalid] = useState({originInput: false, destinationInput: false, departureDateInput: false});
    
  if (originInputValue === "" && origin != null) {
    setOriginInputValue(origin.name);
  }

  if (destinationInputValue === "" && destination != null) {
    setDestinationInputValue(destination.name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let allInputsAreValid = true;
    if (!origin) {
      setInvalid({ ...invalid, originInput: true });
      allInputsAreValid = false;
    }

    if (!destination) {
      setInvalid({ ...invalid, destinationInput: true });
      allInputsAreValid = false;
    }

    if (!departureDate || !availableDates.some((date) => {
        return (
          moment(date).format("YYYY-MM-DD") ===
            moment(departureDate).format("YYYY-MM-DD") ||
          moment(date).format("YYYY-MM-DD") ===
            moment(departureDate).add(24, "hours").format("YYYY-MM-DD")
        );
      })
    ) {
      setInvalid({ ...invalid, departureDateInput: true });
      allInputsAreValid = false;
    }

    if (!allInputsAreValid) {
      return;
    }

    props.history.push({ pathname: "/search" });
  };

  const setOriginInput = (airport) => {
    setOriginInputValue(airport.name);
    setInvalid({ ...invalid, originInput: false });
    dispatch(setFocusedInput(""));

    dispatch(setOrigin(airport));
  };

  const setDestinationInput = (airport) => {
    setDestinationInputValue(airport.name);
    setInvalid({ ...invalid, destinationInput: false });
    dispatch(setFocusedInput(""));

    dispatch(setDestination(airport));
  };

  const changeDepartureDate = (date) => {
    dispatch(setFocusedInput(""));
    dispatch(setDepartureDate(
      //Get date from calendar without timezone offset
      moment(
        new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      ).format("YYYY-MM-DDThh:mm:ss")
    ));
  };

  const onOriginInputChange = (event) => {
    setOriginInputValue(event.target.value);
    setInvalid({ ...invalid, originInput: false });
    if (origin != null) {
      dispatch(setOrigin(null));
    }
  };

  const onDestinationInputChange = (event) => {
    setDestinationInputValue(event.target.value);
    setInvalid({ ...invalid, destinationInput: false });

    if (destination != null) {
      dispatch(setDestination(null));
    }
  };

  const onFocusChanged = (event) => {
    dispatch(setFocusedInput(event.currentTarget.id));
  };

  const getPrettyDate = (date, timezone = "GMT") => {
    if (timezone) {
      return moment(date).format("YYYY-MM-DD");
    }

    return moment(date).format("YYYY-MM-DD");
  };

  const getForm = () => {
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="searchLocations">
          <div>
            <input
              type="text"
              id="Origin"
              placeholder="Origin"
              onInput={onOriginInputChange}
              onFocus={onFocusChanged}
              value={originInputValue}
              className={invalid.originInput === true ? "invalid" : ""}
            />
            <span id="Origin" onClick={onFocusChanged} className="airportCode">
              {origin?.code}
            </span>
          </div>
          <div>
            <input
              type="text"
              id="Destination"
              placeholder="Destination"
              onInput={onDestinationInputChange}
              onFocus={onFocusChanged}
              value={destinationInputValue}
              className={invalid.destinationInput === true ? "invalid" : ""}
            />
            <span
              id="Destination"
              onClick={onFocusChanged}
              className="airportCode"
            >
              {destination?.code}
            </span>
          </div>
        </div>
        <div
          id="DepartureDate"
          onClick={onFocusChanged}
          className={
            invalid.departureDateInput === true
              ? "searchDates button invalid"
              : "searchDates button"
          }
        >
          <span className="secondary">Departure</span>
          <span>{getPrettyDate(departureDate, originTimezone)}</span>
        </div>

        <div id="Passengers" onClick={onFocusChanged} className={"button"}>
          {getAdultsPassengersText(adults)}
          {children > 0 && getChildrenPassengersText(children)}
          {infants > 0 && getInfantsPassengersText(infants)}
        </div>

        <input type="submit" value="Search" onFocus={onFocusChanged} />
      </form>
    );
  };

  return (
    <div className="FlightSearch">
      {getForm()}
      {focusedInput && (
        <div className="sidePanel">
          {focusedInput === "Origin" && (
            <AirportList
              filter={originInputValue}
              sources={availableSources}
              airportClickHandler={setOriginInput}
              loading={originsLoading}
            />
          )}
          {focusedInput === "Destination" && (
            <AirportList
              filter={destinationInputValue}
              sources={availableDestinations}
              airportClickHandler={setDestinationInput}
              loading={destinationsLoading}
            />
          )}
          {focusedInput === "Passengers" && <Passengers />}
          {focusedInput === "DepartureDate" && (
            <Calendar
              timezone={originTimezone}
              departureDate={departureDate}
              setDepartureDate={changeDepartureDate}
              loading={datesLoading}
              availableDates={availableDates.map((date) =>
                moment(date).tz(originTimezone).format("YYYY-MM-DD")
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
