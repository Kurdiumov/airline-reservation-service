import React from "react";
import Map from "../Components/Map";

export default function MapPage(props) {
  return (
    <div className="content">
      <Map history={props.history}></Map>
    </div>
  );
}
