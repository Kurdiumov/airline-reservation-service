import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./Assets/styles.scss";
import AppRouter from "./Routes/AppRouter";
import backendConnector from "./backendConnector.js";
import { setExchangeRate } from "./Actions/currency.js";
import { setOrigin } from "./Actions/search.js";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);

// backendConnector.getCurrentWeather("WAW").then((weather) => {
//   console.log("wweather", weather);
// });

backendConnector.getCurrencies().then((rates) => {
  try {
    store.dispatch(setExchangeRate(rates));
  } catch (err) {
    console.error("Unexpected error occurred while fetching currencies", err);
  }
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    const airport = await backendConnector.getNearestAirport(
      coords.latitude,
      coords.longitude
    );
    const searchComponent = window.searchComponent;
    if (airport &&
      !searchComponent?.state.originInputValue &&
      !searchComponent?.state.destinationInputValue
    ) {
      searchComponent?.setOriginInput(airport);
    }
  });
}
