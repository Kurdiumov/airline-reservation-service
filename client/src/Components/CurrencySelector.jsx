import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../Actions/currency.js";
import "./CurrencySelector.scss";

class CurrencySelector extends Component {
  handleChange = (event) => {
    event.preventDefault();
    this.props.setCurrency(event.target.value);
  };

  render = () => {
    return (
      <div className="currencySelector">
        <select
          name="currencies"
          id="currencies"
          value={this.props.currentCurrency}
          onChange={this.handleChange}
        >
          {Object.keys(this.props.exchangeRates).map((key) => {
            return (
              <option key={key} value={key}>
                {key}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    exchangeRates: state.currencies.exchangeRates
  };
};

const MapDispatchToProps = (dispatch) => ({
  setCurrency: (currency) => dispatch(setCurrency(currency))
});

export default connect(mapStateToProps, MapDispatchToProps)(CurrencySelector);
