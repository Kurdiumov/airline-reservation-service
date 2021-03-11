import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { getPriceInCurrentCurrency } from "../utils.js";
import { setFlight, setPassengersCount } from "../Actions/booking.js";
import "./FlightDetails.scss";

export default function FlightDetails(props) {
  const dispatch = useDispatch();
  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );
  const exchangeRates = useSelector(
    ({ currencies }) => currencies.exchangeRates
  );

  const handleBookBtn = (flightNumber) => {
    const { passengers } = props;
    dispatch(setFlight(flightNumber));
    dispatch(
      setPassengersCount(
        passengers?.adults,
        passengers?.children,
        passengers?.infants
      )
    );
    props.history.push("/booking");
  };

  const { flight, origin, destination } = props;
  return (
    <li className="flightDetails">
      <div>
        <div>
          {moment(flight.departureTime)
            .tz(origin.timezone)
            .format("MMMM Do YYYY, hh:mm")}
          ({moment.tz(origin.timezone).zoneName()})
        </div>
        <div>{origin.name}</div>
        <div>
          {origin.city}, {origin.country}
        </div>
      </div>
      <div>
        <div>----------------></div>
        <span>{flight.duration}</span>
        <div>{flight.distance} km</div>
      </div>
      <div>
        <div>
          {moment(flight.arrivalTime)
            .tz(destination.timezone)
            .format("MMMM Do YYYY, hh:mm")}
          ({moment.tz(destination.timezone).zoneName()})
        </div>
        <div>{destination.name}</div>
        <div>
          {destination.city}, {destination.country}
        </div>
      </div>
      <div>
        <div>Flight Number</div>
        <div> {flight.flightNumber}</div>
      </div>
      <div
        className="book-btn"
        onClick={() => handleBookBtn(flight.flightNumber)}
      >
        <div>BOOK</div>
        <div>Prices start at</div>
        <div>
          {getPriceInCurrentCurrency(
            flight.economyPrice,
            currentCurrency,
            exchangeRates
          )}
        </div>
      </div>
    </li>
  );
}
