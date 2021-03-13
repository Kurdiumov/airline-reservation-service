import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { getPriceInCurrentCurrency } from "../utils.js";
import { setFlight, setPassengers } from "../Actions/booking.js";
import "./FlightDetails.scss";

export default function FlightDetails(props) {
  const dispatch = useDispatch();
  const currentCurrency = useSelector(({ currencies }) => currencies.currentCurrency);

  const handleBookBtn = (flight) => {
    const { passengers } = props;
    console.log(flight);
    dispatch(setFlight(flight));

    let adults = {};
    for (let i = 0; i < passengers?.adults; i++) {
      adults["adult_" + i] = {};
    }

    let children = {};
    for (let i = 0; i < passengers?.children; i++) {
      children["child__" + i] = {};
    }

    let infants = {};
    for (let i = 0; i < passengers?.infants; i++) {
      infants["infant_" + i] = {};
    }

    dispatch(setPassengers(adults, children, infants));
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
        onClick={() => handleBookBtn(flight)}
      >
        <div>BOOK</div>
        <div>Prices start at</div>
        <div>
          {getPriceInCurrentCurrency(flight.economyPrice)}
        </div>
      </div>
    </li>
  );
}
