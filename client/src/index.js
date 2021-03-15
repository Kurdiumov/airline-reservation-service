import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import "./Assets/styles.scss";
import AppRouter from "./Routes/AppRouter";
import backendConnector from "./backendConnector.js";
import { setExchangeRate } from "./Actions/currency.js";
import { setOrigin } from "./Actions/search.js";
import { getOriginsAsync, getDestinationsAsync } from "./Actions/data";
import theme from "./theme";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

backendConnector.getCurrencies().then((rates) => {
  try {
    store.dispatch(setExchangeRate(rates));
  } catch (err) {
    console.error("Unexpected error occurred while fetching currencies", err);
  }
});

store.dispatch(getOriginsAsync());
store.dispatch(getDestinationsAsync());

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      backendConnector
        .getNearestAirport(coords.latitude, coords.longitude)
        .then((airport) => {
          if (airport && store.getState().search.focusedInput === "") {
            store.dispatch(setOrigin(airport));
            store.dispatch(getDestinationsAsync(airport.code));
          }
        });
    },
    console.error,
    { timeout: 10000 }
  );
}
