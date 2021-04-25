import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";
import Summary from "../Components/Booking/Summary";

export default function BookingSummaryPage(props) {
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
      <Summary />
    </ContentContainer>
  );
}
