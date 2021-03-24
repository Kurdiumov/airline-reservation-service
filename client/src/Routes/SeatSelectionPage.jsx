import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SeatSelection from "../Components/Booking/SeatSelection";
import ContentContainer from "../Components/ContentContainer";

export default function SeatSelectionPage(props) {
  const selectedFlight = useSelector((state) => state.booking.selectedFlight);
  const isLoggedIn = useSelector((state) => !!state.auth.token);

  if (!selectedFlight) {
    return <Redirect to="/" />;
  }

  if (!isLoggedIn) {
    return (
      <Redirect to={{ pathname: "/login", state: { redirect: "/booking" } }} />
    );
  }

  return (
    <ContentContainer>
      <SeatSelection history={props.history} />
    </ContentContainer>
  );
}
