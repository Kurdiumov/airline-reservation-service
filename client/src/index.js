import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import AppRouter from "./Routes/AppRouter";
import backendConnector from "./backendConnector.js";
import { setExchangeRate } from "./Actions/currency.js";
import { setOrigin } from "./Actions/search.js";
import { login } from "./Actions/auth.js";
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

const token = localStorage.getItem("token");
const name = localStorage.getItem("name");
const surname = localStorage.getItem("surname");

if (token && name && surname) {
  store.dispatch(login(token, name, surname));
}

backendConnector.getCurrencies().then((rates) => {
  try {
    store.dispatch(setExchangeRate(rates));
  } catch (err) {
    console.error("Unexpected error occurred while fetching currencies", err);
  }
});

store.dispatch(getOriginsAsync());

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      backendConnector
        .getNearestAirport(coords.latitude, coords.longitude)
        .then((airport) => {
          if (
            airport &&
            store.getState().search.focusedInput === "" &&
            store.getState().search.origin == null
          ) {
            store.dispatch(setOrigin(airport));
            store.dispatch(getDestinationsAsync(airport.code));
          }
        });
    },
    console.error,
    { timeout: 10000 }
  );
}
