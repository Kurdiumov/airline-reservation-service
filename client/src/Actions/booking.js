export const setFlight = (flight) => ({
  type: "SET_FLIGHT",
  flight
});

export const setPassengers = (adults = {}, children = {}, infants = {}) => ({
  type: "SET_PASSENGERS",
  adults,
  children,
  infants
});

export const setPassenger = (id, passengerType, value) => ({
  type: "SET_PASSENGER",
  id,
  passengerType,
  value
});
