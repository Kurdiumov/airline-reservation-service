import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../Actions/currency.js";
import "./CurrencySelector.scss";

export default function CurrencySelector() {
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.currencies.currentCurrency);
  const exchangeRates = useSelector((state) => state.currencies.exchangeRates);

  const handleCurrencyChange = (event) => {
    event.preventDefault();
    dispatch(setCurrency(event.target.value));
  };

  return (
    <div className="currencySelector">
      <select
        name="currencies"
        id="currencies"
        value={currentCurrency}
        onChange={handleCurrencyChange}
      >
        {Object.keys(exchangeRates).map((key) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}
