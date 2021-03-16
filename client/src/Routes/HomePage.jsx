import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";
import ContentContainer from "../Components/ContentContainer";

export default function HomePage(props) {
  return (
    <ContentContainer>
      <FlightSearch history={props.history}></FlightSearch>
    </ContentContainer>
  );
}
