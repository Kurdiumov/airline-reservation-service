import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Booking.scss";
import Passenger from "./Passenger";
import { setPassenger } from "../../Actions/booking";

export default function Booking() {
  const dispatch = useDispatch();
  const adults = useSelector(({ booking }) => booking.passengers.adults);
  const children = useSelector(({ booking }) => booking.passengers.children);
  const infants = useSelector(({ booking }) => booking.passengers.infants);
  const [allInputsAreValid, setAllInputsAreValid] = useState(false);

  const handleClick = (event) => {
    if (!allInputsAreValid) {
      return;
    }

    console.log("Continue button clicked", event);
    // TODO Redirect to seat selection
  };

  const onPassengerValueChanged = (id, newValue) => {
    dispatch(setPassenger(id, newValue));
    updateInputsValid();
  };

  const updateInputsValid = () => {
    const allAdultsAreValid = Object.values(adults).every(
      (x) => x.name && x.surname && x.sex && x.baggageCount >= 0
    );
    const allChildrenAreValid = Object.values(children).every(
      (x) => x.name && x.surname && x.sex && x.baggageCount >= 0
    );
    const allInfantsAreValid = Object.values(infants).every(
      (x) => x.name && x.surname && x.sex && x.baggageCount === 0
    );

    setAllInputsAreValid(
      allAdultsAreValid && allChildrenAreValid && allInfantsAreValid
    );
  };

  return (
    <div className="booking">
      <ul>
        {Object.keys(adults).map((value, index) => (
          <li key={value}>
            <Passenger
              index={index}
              id={value}
              type="Adult"
              notifyParent={onPassengerValueChanged}
              canSelectBaggage={true}
            />
          </li>
        ))}
        {Object.keys(children).map((value, index) => (
          <li key={value}>
            <Passenger
              index={index + Object.keys(adults).length}
              id={value}
              type="Child"
              notifyParent={onPassengerValueChanged}
              canSelectBaggage={true}
            />
          </li>
        ))}
        {Object.keys(infants).map((value, index) => (
          <li key={value}>
            <Passenger
              index={
                index +
                Object.keys(adults).length +
                Object.keys(children).length
              }
              id={value}
              type="Infant"
              notifyParent={onPassengerValueChanged}
              canSelectBaggage={false}
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={handleClick}
          className={allInputsAreValid ? "" : "disabled"}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
