import React, { Component } from "react";
import "./FlightDetails.scss";

class FlightDetails extends Component {
  render = () => {
    const { flight, origin, destination } = this.props;
    console.log(flight);
    console.log(origin);
    console.log(destination);
    return (
      <li className="flightDetails">
        <div>
          <div>
            {new Date(flight.departureTime).toLocaleString("pl-PL", {
              timeZone: origin.timezone
            })}
          </div>
          <div>{origin.timezone}</div>
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
            })}
          </div>
          <div>{destination.timezone}</div>
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

{
  /* <li key={flight._id}>
                  #{flight.flightNumber} {flight.origin} - {flight.destination}{" "}
                  ({flight.departureTime}:{flight.arrivalTime})
                </li> */
}
