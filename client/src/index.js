import React from "react";
import ReactDOM from "react-dom";
import "./Assets/styles.scss";
import AppRouter from "./Routes/AppRouter";

ReactDOM.render(<AppRouter />, document.getElementById("root"));

fetch("/backendStatus");