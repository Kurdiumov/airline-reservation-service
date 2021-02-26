import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";

function HomePage(props) {
  return (
    <div className="content">
      <FlightSearch history={props.history}></FlightSearch>
    </div>
  );
}

export default HomePage;
