import React from "react";
import Map from "../Components/Map";

function MapPage(props) {
  return (
    <div className="content">
      <Map history={props.history}></Map>
    </div>
  );
}

export default MapPage;
