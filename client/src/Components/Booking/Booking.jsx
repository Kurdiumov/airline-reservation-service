import React, { Component } from "react";
import { connect } from "react-redux";
import "./Booking.scss";
import Passenger from "./Passenger";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allInputAreValid: false
    };

    const { adults, children, infants } = this.props;

    this.childComponents = [];
    for (let i = 0; i < adults; i++) {
      this.childComponents["adult_" + i] = false;
    }
    for (let i = 0; i < children; i++) {
      this.childComponents["child_" + i] = false;
    }
    for (let i = 0; i < infants; i++) {
      this.childComponents["infant_" + i] = false;
    }
  }

  handleClick = (event) => {
    if (!this.state.allInputAreValid) {
      return;
    }

    console.log("Continue button clicked", event);
    // TODO Redirect to seat selection
  };

  onChildValidationChanged = (id, isValid) => {
    this.childComponents[id] = isValid;

    const allInputsValid = !Object.values(this.childComponents).some(
      (x) => x === false
    );
    if (this.state.allInputAreValid != allInputsValid) {
      this.setState({ allInputAreValid: allInputsValid });
    }
  };

  render = () => {
    return (
      <div className="booking">
        <ul>
          {[...Array(this.props.adults)].map((value, index) => (
            <li key={"adult_" + index}>
              <Passenger
                index={index}
                id={"adult_" + index}
                type="Adult"
                notifyParent={this.onChildValidationChanged}
              />
            </li>
          ))}
          {[...Array(this.props.children)].map((value, index) => (
            <li key={"child_" + index}>
              <Passenger
                index={index + this.props.adults}
                id={"child_" + index}
                type="Child"
                notifyParent={this.onChildValidationChanged}
              />
            </li>
          ))}
          {[...Array(this.props.infants)].map((value, index) => (
            <li key={"infant_" + index}>
              <Passenger
                index={index + this.props.adults + this.props.children}
                id={"infant_" + index}
                type="Infant"
                notifyParent={this.onChildValidationChanged}
              />
            </li>
          ))}
        </ul>
        <div>
          <button
            onClick={this.handleClick}
            className={this.state.allInputAreValid ? "" : "disabled"}
          >
            CONTINUE
          </button>
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
