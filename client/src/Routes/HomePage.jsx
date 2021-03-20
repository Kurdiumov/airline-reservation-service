import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";

export default function HomePage(props) {
  return <FlightSearch history={props.history}></FlightSearch>;
}
