import React, { Component } from "react";
import "./Passengers.scss";

const passengersLimit = 8;

const getPassengersText = (count, single, plural) => {
  if (count > 1)
    return (
      <span>
        {count}
        <span className="secondary"> {plural} </span>
      </span>
    );
  return (
    <span>
      {count}
      <span className="secondary"> {single} </span>
    </span>
  );
};

const getAdultsPassengersText = (adultsCount) => {
  return getPassengersText(adultsCount, "adult", "adults");
};

const getChildrenPassengersText = (childrenCount) => {
  return getPassengersText(childrenCount, "child", "Children");
};

const getInfantsPassengersText = (infantsCount) => {
  return getPassengersText(infantsCount, "infant", "infants");
};

class Passengers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: props.passengers.adults,
      children: props.passengers.children,
      infants: props.passengers.infants
    };
  }

  onAdultPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 1) return;
    if (newValue < this.state.infants) return;

    let newState = { ...this.state };
    newState.adults = newValue;
    this.setState(newState);
    this.props.onPassengersCountChange(newState);
  };

  onChildPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 0) return;

    let newState = { ...this.state };
    newState.children = newValue;
    this.setState(newState);
    this.props.onPassengersCountChange(newState);
  };

  onInfantPassengersCountChange = (newValue) => {
    if (newValue > passengersLimit) return;
    if (newValue < 0) return;
    if (newValue > this.state.adults) return;

    let newState = { ...this.state };
    newState.infants = newValue;
    this.setState(newState);
    this.props.onPassengersCountChange(newState);
  };

  render = () => {
    return (
      <div className="passengers">
        <div>
          <button
            className={
              this.state.adults === 1 ||
              this.state.adults === this.state.infants
                ? "disabled"
                : ""
            }
            onClick={() =>
              this.onAdultPassengersCountChange(this.state.adults - 1)
            }
          >
            -
          </button>
          <span>
            {getAdultsPassengersText(this.state.adults)}
            <span className="secondary"> (14+)</span>
          </span>
          <button
            className={this.state.adults === passengersLimit ? "disabled" : ""}
            onClick={() =>
              this.onAdultPassengersCountChange(this.state.adults + 1)
            }
          >
            +
          </button>
        </div>

        <div>
          <button
            className={this.state.children === 0 ? "disabled" : ""}
            onClick={() =>
              this.onChildPassengersCountChange(this.state.children - 1)
            }
          >
            -
          </button>
          <span>
            {getChildrenPassengersText(this.state.children)}
            <span className="secondary"> (2-14)</span>
          </span>
          <button
            className={
              this.state.children === passengersLimit ? "disabled" : ""
            }
            onClick={() =>
              this.onChildPassengersCountChange(this.state.children + 1)
            }
          >
            +
          </button>
        </div>

        <div>
          <button
            className={this.state.infants === 0 ? "disabled" : ""}
            onClick={() =>
              this.onInfantPassengersCountChange(this.state.infants - 1)
            }
          >
            -
          </button>
          <span>
            {getInfantsPassengersText(this.state.infants)}
            <span className="secondary"> (0-2)</span>
          </span>
          <button
            className={
              this.state.infants === this.state.adults ? "disabled" : ""
            }
            onClick={() =>
              this.onInfantPassengersCountChange(this.state.infants + 1)
            }
          >
            +
          </button>
        </div>
        <p>Choose passengers based on their age at the time of travel.</p>
      </div>
    );
  };
}

export {
  Passengers,
  getAdultsPassengersText,
  getChildrenPassengersText,
  getInfantsPassengersText
};
