import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import App from './Components/App';
import Backend from "./Backend";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log("Backend url = ", Backend.getUrl());

fetch("/api")
  .then(response => response.json())
  .then(data => console.log(data));