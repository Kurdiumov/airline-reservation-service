import React from "react";
import FlightSearch from "../Components/Search/FlightSearch";
import Offers from "../Components/Offers";
import ContentContainer from "../Components/ContentContainer";
import "./Home.scss";

export default function HomePage(props) {
  return (
    <>
      <div className="cover"></div>
      <ContentContainer>
        <FlightSearch history={props.history}></FlightSearch>
        <Offers></Offers>
      </ContentContainer>
    </>
  );
}
