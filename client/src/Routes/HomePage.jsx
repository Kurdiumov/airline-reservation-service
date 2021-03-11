import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";

export default function HomePage(props) {
  return (
    <div className="content">
      <FlightSearch history={props.history}></FlightSearch>
    </div>
  );
}
