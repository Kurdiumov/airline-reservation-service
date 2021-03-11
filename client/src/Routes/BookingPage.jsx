import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Booking from "../Components/Booking/Booking";

export default function BookingPage() {
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
    <div className="content">
      <Booking />
    </div>
  );
}
