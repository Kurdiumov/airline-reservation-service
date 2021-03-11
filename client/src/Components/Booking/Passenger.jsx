import React, { useEffect, useState } from "react";
import useInput from "../../Hooks/useInput";
import "./Passenger.scss";

export default function Passenger(props) {
  const [type] = useState(props.type.toUpperCase());
  const name = useInput("");
  const surname = useInput("");
  const [sex, setSex] = useState(null);

  useEffect(() => {
    const isValid = name.value.length > 0 && surname.value.length > 0 && sex !== null;
    props.notifyParent(props.id, isValid);
  }, [name, surname, sex]);

  const handleSexBtnClick = (event) => {
    setSex(event.target.value);
  };

  // TODO Add baggage selection to passenger
  return (
    <div className="passenger">
      <h3>
        {props.index + 1}. PASSENGER ({type})
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
      </h3>
    </div>
  );
}
