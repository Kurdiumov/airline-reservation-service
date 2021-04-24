import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";
import Offers from "../Components/Offers";
import ContentContainer from "../Components/ContentContainer";

export default function HomePage(props) {
  return (
    <ContentContainer>
      <FlightSearch history={props.history}></FlightSearch>
      <Offers></Offers>
    </ContentContainer>
  );
}
