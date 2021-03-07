import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./Assets/styles.scss";
import AppRouter from "./Routes/AppRouter";
import backendConnector from "./backendConnector.js";
import { setExchangeRate } from "./Actions/currency.js";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);

backendConnector.getCurrencies().then((rates) => {
  try {
    store.dispatch(setExchangeRate(rates));
  } catch (err) {
    console.err("Unexpected error occurred while fetching currencies", err);
  }
});
