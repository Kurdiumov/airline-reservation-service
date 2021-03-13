import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useInput from "../../Hooks/useInput";
import Baggage from "./Baggage";
import "./Passenger.scss";

export default function Passenger(props) {
  const [type] = useState(props.type.toUpperCase());
  const name = useInput("");
  const surname = useInput("");
  const [baggageCount, setBaggageCount] = useState(0);
  const [sex, setSex] = useState(null);
  const baseBaggagePrice = useSelector(({ booking }) => booking.baggagePrice);

  useEffect(() => {
    props.notifyParent(props.id, {
      name: name.value,
      surname: surname.value,
      sex,
      baggageCount
    });
  }, [name, surname, sex, baggageCount]);

  const handleSexBtnClick = (event) => {
    setSex(event.target.value);
  };

  return (
    <div className="passenger">
      <h3>
        {props.index + 1}. PASSENGER ({type})
      </h3>
      <form>
        <input type="text" placeholder="First Name" {...name.bind}></input>
        <input type="text" placeholder="Last Name" {...surname.bind}></input>
        <input
          type="button"
          value="Male"
          onClick={handleSexBtnClick}
          className={sex === "Male" ? "selected" : ""}
        ></input>
        <input
          type="button"
          value="Female"
          onClick={handleSexBtnClick}
          className={sex === "Female" ? "selected" : ""}
        ></input>
      </form>
      {props.canSelectBaggage && (
        <Baggage
          pricePerItem={baseBaggagePrice}
          count={baggageCount}
          changeCount={setBaggageCount}
        />
      )}
    </div>
  );
}
