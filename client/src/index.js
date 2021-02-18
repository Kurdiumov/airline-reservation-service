import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./Assets/styles.scss";
import AppRouter from "./Routes/AppRouter";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);

fetch("/backendStatus");
