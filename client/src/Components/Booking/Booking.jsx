import React, { Component } from "react";
import { connect } from "react-redux";
import "./Booking.scss";
import Passenger from "./Passenger";

class Booking extends Component {
  handleClick = (event) => {
    console.log("Continue button clicked", event);
    // TODO Validate passenger inputs
    // TODO Redirect to seat selection
  };

  render = () => {
    return (
      <div className="booking">
        <ul>
          {[...Array(this.props.adults)].map((value, index) => (
            <li key={"adult_" + index}>
              <Passenger index={index + 1} type="Adult" />
            </li>
          ))}
          {[...Array(this.props.children)].map((value, index) => (
            <li key={"child_" + index}>
              <Passenger index={index + this.props.adults + 1} type="Child" />
            </li>
          ))}
          {[...Array(this.props.infants)].map((value, index) => (
            <li key={"infant_" + index}>
              <Passenger
                index={index + this.props.adults + this.props.children + 1}
                type="Infant"
              />
            </li>
          ))}
        </ul>
        <div>
          <button onClick={this.handleClick}>CONTINUE</button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    adults: state.booking.passengersCount.adults,
    children: state.booking.passengersCount.children,
    infants: state.booking.passengersCount.infants
  };
};

const MapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, {})(Booking);
