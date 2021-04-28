import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MyBookings from "../Components/Booking/MyBookings";
import ContentContainer from "../Components/ContentContainer";

export default function MyBookingsPage(props) {
  const isLoggedIn = useSelector((state) => !!state.auth.token);

  if (!isLoggedIn) {
    return (
      <Redirect to={{ pathname: "/login", state: { redirect: "/booking" } }} />
    );
  }

  return (
    <ContentContainer>
      <MyBookings />
    </ContentContainer>
  );
}
