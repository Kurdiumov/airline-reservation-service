export const setFlight = (flight) => {
  return (dispatch) => {
    dispatch(setFlightNumber(flight.flightNumber));
    dispatch(setBaggagePricePerItem(flight.luggagePrice));
  };
};

const setFlightNumber = (flightNumber) => ({
  type: "SET_FLIGHT_NUMBER",
  flightNumber
});

const setBaggagePricePerItem = (price) => ({
  type: "SET_BAGGAGE_PRICE_PER_ITEM",
  price
});

const passengerInitialState = {
  baggageCount: 0
};

export const setPassengers = (
  adults = passengerInitialState,
  children = passengerInitialState,
  infants = passengerInitialState
) => ({
  type: "SET_PASSENGERS",
  adults,
  children,
  infants
});

export const setPassenger = (id, value) => ({
  type: "SET_PASSENGER",
  id,
  value
});
