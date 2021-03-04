import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setAdultPassengers,
  setChildrenPassengers,
  setInfantPassengers
} from "../../Actions/search.js";
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

export const getAdultsPassengersText = (adultsCount) => {
  return getPassengersText(adultsCount, "adult", "adults");
};

export const getChildrenPassengersText = (childrenCount) => {
  return getPassengersText(childrenCount, "child", "Children");
};

export const getInfantsPassengersText = (infantsCount) => {
  return getPassengersText(infantsCount, "infant", "infants");
};

class Passengers extends Component {
  render = () => {
    return (
      <div className="passengers">
        <div>
          <button
            className={
              this.props.adults === 1 ||
              this.props.adults === this.props.infants
                ? "disabled"
                : ""
            }
            onClick={() => this.props.setAdultPassengers(this.props.adults - 1)}
          >
            -
          </button>
          <span>
            {getAdultsPassengersText(this.props.adults)}
            <span className="secondary"> (14+)</span>
          </span>
          <button
            className={this.props.adults === passengersLimit ? "disabled" : ""}
            onClick={() => this.props.setAdultPassengers(this.props.adults + 1)}
          >
            +
          </button>
        </div>

        <div>
          <button
            className={this.props.children === 0 ? "disabled" : ""}
            onClick={() =>
              this.props.setChildrenPassengers(this.props.children - 1)
            }
          >
            -
          </button>
          <span>
            {getChildrenPassengersText(this.props.children)}
            <span className="secondary"> (2-14)</span>
          </span>
          <button
            className={
              this.props.children === passengersLimit ? "disabled" : ""
            }
            onClick={() =>
              this.props.setChildrenPassengers(this.props.children + 1)
            }
          >
            +
          </button>
        </div>

        <div>
          <button
            className={this.props.infants === 0 ? "disabled" : ""}
            onClick={() =>
              this.props.setInfantPassengers(this.props.infants - 1)
            }
          >
            -
          </button>
          <span>
            {getInfantsPassengersText(this.props.infants)}
            <span className="secondary"> (0-2)</span>
          </span>
          <button
            className={
              this.props.infants === this.props.adults ? "disabled" : ""
            }
            onClick={() =>
              this.props.setInfantPassengers(this.props.infants + 1)
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

const mapStateToProps = (state) => {
  return {
    adults: state.search.passengers.adults,
    children: state.search.passengers.children,
    infants: state.search.passengers.infants
  };
};

const MapDispatchToProps = (dispatch) => ({
  setAdultPassengers: (adults) => dispatch(setAdultPassengers(adults)),
  setChildrenPassengers: (children) =>
    dispatch(setChildrenPassengers(children)),
  setInfantPassengers: (infants) => dispatch(setInfantPassengers(infants))
});

export default connect(mapStateToProps, MapDispatchToProps)(Passengers);
