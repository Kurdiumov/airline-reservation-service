import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.scss";
import App from "./Components/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

fetch("/backendStatus");