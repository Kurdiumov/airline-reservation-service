export const setFlight = (flight) => {
  return (dispatch) => {
    dispatch(setFlightNumber(flight.flightNumber));
    dispatch(setBaggagePricePerItem(flight.luggagePrice));
    dispatch(setBusinessPrice(flight.businessPrice));
    dispatch(setEconomyPrice(flight.economyPrice));
    dispatch(setAircraftModel(flight.aircraftModel));
    dispatch(setArrivalDate(flight.arrivalTime));
    dispatch(setDepartureDate(flight.departureTime));
    dispatch(setFlightDuration(flight.duration));
  };
};

export const setOriginDetails = (origin) => ({
  type: "SET_ORIGIN_DETAILS",
  origin
});

export const setDestinationDetails = (destination) => ({
  type: "SET_DESTINATION_DETAILS",
  destination
});

const setFlightNumber = (flightNumber) => ({
  type: "SET_FLIGHT_NUMBER",
  flightNumber
});

const setBaggagePricePerItem = (price) => ({
  type: "SET_BAGGAGE_PRICE_PER_ITEM",
  price
});

const setBusinessPrice = (price) => ({
  type: "SET_BUSINESS_PRICE",
  price
});

const setEconomyPrice = (price) => ({
  type: "SET_ECONOMY_PRICE",
  price
});

const setDepartureDate = (date) => ({
  type: "SET_DEPARTURE_DATE",
  date
});

const setArrivalDate = (date) => ({
  type: "SET_ARRIVAL_DATE",
  date
});

const setFlightDuration = (duration) => ({
  type: "SET_FLIGHT_DURATION",
  duration
});

const setAircraftModel = (model) => ({
  type: "SET_AIRCRAFT_MODEL",
  model
});

const passengerInitialState = {
  baggageCount: 0,
  selectedSeat: null,
  isBusinessSeat: false
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
  value: {...passengerInitialState, ...value}
});

export const setSeat = (passengerId, seat, isBusiness) => ({
  type: "SET_SEAT",
  passengerId,
  seat,
  isBusiness
});
