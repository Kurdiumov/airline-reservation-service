import React from "react";
import Map from "../Components/Map";

export default function MapPage(props) {
  return (
      <Map history={props.history}></Map>
  );
}
