import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Booking.scss";
import Passenger from "./Passenger";

export default function Booking() {
  const [allInputAreValid, setAllInputAreValid] = useState(false);
  const adults = useSelector(({ booking }) => booking.passengersCount.adults);
  const children = useSelector(({ booking }) => booking.passengersCount.children);
  const infants = useSelector(({ booking }) => booking.passengersCount.infants);

  const childComponents = [];
  for (let i = 0; i < adults; i++) {
    childComponents["adult_" + i] = false;
  }
  for (let i = 0; i < children; i++) {
    childComponents["child_" + i] = false;
  }
  for (let i = 0; i < infants; i++) {
    childComponents["infant_" + i] = false;
  }

  const handleClick = (event) => {
    if (!allInputAreValid) {
      return;
    }

    console.log("Continue button clicked", event);
    // TODO Redirect to seat selection
  };

  const onChildValidationChanged = (id, isValid) => {
    childComponents[id] = isValid;

    const allValid = !Object.values(childComponents).some((x) => x === false);
    setAllInputAreValid(allValid);
  };

  return (
    <div className="booking">
      <ul>
        {[...Array(adults)].map((value, index) => (
          <li key={"adult_" + index}>
            <Passenger
              index={index}
              id={"adult_" + index}
              type="Adult"
              notifyParent={onChildValidationChanged}
            />
          </li>
        ))}
        {[...Array(children)].map((value, index) => (
          <li key={"child_" + index}>
            <Passenger
              index={index + adults}
              id={"child_" + index}
              type="Child"
              notifyParent={onChildValidationChanged}
            />
          </li>
        ))}
        {[...Array(infants)].map((value, index) => (
          <li key={"infant_" + index}>
            <Passenger
              index={index + adults + children}
              id={"infant_" + index}
              type="Infant"
              notifyParent={onChildValidationChanged}
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={handleClick}
          className={allInputAreValid ? "" : "disabled"}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
