import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

export default function Passengers() {
  const dispatch = useDispatch();
  const adults = useSelector(({ search }) => search.passengers.adults);
  const children = useSelector(({ search }) => search.passengers.children);
  const infants = useSelector(({ search }) => search.passengers.infants);

  return (
    <div className="passengers">
      <div>
        <button
          className={adults === 1 || adults === infants ? "disabled" : ""}
          onClick={() => dispatch(setAdultPassengers(adults - 1))}
        >
          -
        </button>
        <span>
          {getAdultsPassengersText(adults)}
          <span className="secondary"> (14+)</span>
        </span>
        <button
          className={adults === passengersLimit ? "disabled" : ""}
          onClick={() => dispatch(setAdultPassengers(adults + 1))}
        >
          +
        </button>
      </div>

      <div>
        <button
          className={children === 0 ? "disabled" : ""}
          onClick={() => dispatch(setChildrenPassengers(children - 1))}
        >
          -
        </button>
        <span>
          {getChildrenPassengersText(children)}
          <span className="secondary"> (2-14)</span>
        </span>
        <button
          className={children === passengersLimit ? "disabled" : ""}
          onClick={() => dispatch(setChildrenPassengers(children + 1))}
        >
          +
        </button>
      </div>

      <div>
        <button
          className={infants === 0 ? "disabled" : ""}
          onClick={() => dispatch(setInfantPassengers(infants - 1))}
        >
          -
        </button>
        <span>
          {getInfantsPassengersText(infants)}
          <span className="secondary"> (0-2)</span>
        </span>
        <button
          className={infants === adults ? "disabled" : ""}
          onClick={() => dispatch(setInfantPassengers(infants + 1))}
        >
          +
        </button>
      </div>
      <p>Choose passengers based on their age at the time of travel.</p>
    </div>
  );
}
