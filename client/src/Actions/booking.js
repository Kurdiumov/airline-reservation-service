export const setFlight = (flight) => ({
  type: "SET_FLIGHT",
  flight
});

export const setPassengersCount = (adults = 1, children = 0, infants = 0) => ({
  type: "SET_PASSENGERS_COUNT",
  adults,
  children,
  infants
});
