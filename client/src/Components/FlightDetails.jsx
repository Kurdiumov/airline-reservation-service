import React, { Component } from "react";
import moment from "moment"
import momentTimezone from "moment-timezone";
import "./FlightDetails.scss";

class FlightDetails extends Component {
  render = () => {
    const { flight, origin, destination } = this.props;
    return (
      <li className="flightDetails">
        <div>
          <div>
            {moment(flight.departureTime).tz(origin.timezone).format("MMMM Do YYYY, hh:mm")}
            ({moment.tz(origin.timezone).zoneName()})
          </div>
          <div>{origin.name}</div>
          <div>
            {origin.city}, {origin.country}
          </div>
          <span>{flight.origin}</span>
        </div>
        <div>
          <div>----------------></div>
          <span>{flight.duration}</span>
          <div>{flight.distance} km</div>
        </div>
        <div>
          <div>
            {new Date(flight.arrivalTime).toLocaleString("pl-PL", {
              timeZone: destination.timezone
            })} ({moment.tz(destination.timezone).zoneName()})
          </div>
          <div>{destination.name}</div>
          <div>
            {destination.city}, {destination.country}
          </div>
          <span>{flight.destination}</span>
        </div>
        <div>
          <span>Flight Number: {flight.flightNumber}</span>
        </div>
        <div>
          <span>BOOK</span>
          <div>Prices start at {flight.economyPrice}PLN</div>
        </div>
      </li>
    );
  };
}

export default FlightDetails;
