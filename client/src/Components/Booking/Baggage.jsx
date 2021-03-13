import React from "react";
import { useSelector } from "react-redux";
import { getPriceInCurrentCurrency } from "../../utils";
import "./Baggage.scss";
import baggage from "../../Assets/baggage.png";
import baggageDisabled from "../../Assets/baggage-disabled.png";

export default function Passenger(props) {
  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );

  const handleRemoveBaggage = () => {
    if (props.count <= 0) {
      return;
    }
    props.changeCount(props.count - 1);
  };

  const handleAddBaggage = () => {
    if (props.count >= 6) {
      return;
    }
    props.changeCount(props.count + 1);
  };

  return (
    <div className="baggage">
      <hr />
      <h3>BAGGAGE</h3>
      <div>
        <button
          onClick={handleRemoveBaggage}
          className={props.count <= 0 ? "disabled" : ""}
        >
          -
        </button>
        <div>
          {props.count === 0 ? (
            <img src={baggageDisabled} alt="Baggage" />
          ) : (
            <img src={baggage} alt="Baggage" />
          )}

          <p>{props.count} x 32 kg</p>
          <p>{getPriceInCurrentCurrency(props.pricePerItem)} per item</p>
        </div>
        <button
          onClick={handleAddBaggage}
          className={props.count >= 6 ? "disabled" : ""}
        >
          +
        </button>
      </div>
    </div>
  );
}
