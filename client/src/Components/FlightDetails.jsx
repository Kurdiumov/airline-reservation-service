import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { getPriceInCurrentCurrency } from "../utils.js";
import "./FlightDetails.scss";

class FlightDetails extends Component {
  render = () => {
    const { flight, origin, destination } = this.props;
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
        <div className="book-btn">
          <div>BOOK</div>
          <div>Prices start at</div>
          <div>
            {getPriceInCurrentCurrency(
              flight.economyPrice,
              this.props.currentCurrency,
              this.props.exchangeRates
            )}
          </div>
        </div>
      </li>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    exchangeRates: state.currencies.exchangeRates
  };
};

export default connect(mapStateToProps, {})(FlightDetails);
