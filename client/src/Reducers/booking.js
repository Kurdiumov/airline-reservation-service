const initialState = {
  selectedFlight: null,
  aircraftModel: null,
  departureDate: null,
  arrivalDate: null,
  flightDuration: 0,
  baggagePrice: 0,
  businessPrice: 0,
  economyPrice: 0,
  originDetails: null,
  destinationDetails: null,
  passengers: {
    adults: {},
    children: {},
    infants: {}
  }
};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_ORIGIN_DETAILS":
      newState.originDetails = action.origin;
      return newState;
    case "SET_DESTINATION_DETAILS":
      newState.destinationDetails = action.destination;
      return newState;
    case "SET_FLIGHT_NUMBER":
      newState.selectedFlight = action.flightNumber;
      return newState;
    case "SET_BAGGAGE_PRICE_PER_ITEM":
      newState.baggagePrice = action.price;
      return newState;
    case "SET_BUSINESS_PRICE":
      newState.businessPrice = action.price;
      return newState;
    case "SET_ECONOMY_PRICE":
      newState.economyPrice = action.price;
      return newState;
    case "SET_DEPARTURE_DATE":
      newState.departureDate = action.date;
      return newState;
    case "SET_ARRIVAL_DATE":
      newState.arrivalDate = action.date;
      return newState;
    case "SET_FLIGHT_DURATION":
      newState.flightDuration = action.duration;
      return newState;
    case "SET_AIRCRAFT_MODEL":
      newState.aircraftModel = action.model;
      return newState;
    case "SET_PASSENGERS":
      newState.passengers.adults = action.adults;
      newState.passengers.children = action.children;
      newState.passengers.infants = action.infants;
      return newState;
    case "SET_PASSENGER":
      if (action.id.startsWith("adult_")) {
        newState.passengers.adults[action.id] = action.value;
      } else if (action.id.startsWith("child_")) {
        newState.passengers.children[action.id] = action.value;
      } else if (action.id.startsWith("infant_")) {
        newState.passengers.infants[action.id] = action.value;
      }

      return newState;

    case "SET_SEAT":
      if (action.passengerId.startsWith("adult_")) {
        newState.passengers.adults[action.passengerId].selectedSeat =
          action.seat;
        newState.passengers.adults[action.passengerId].isBusinessSeat =
          action.isBusiness;
      } else if (action.passengerId.startsWith("child_")) {
        newState.passengers.children[action.passengerId].selectedSeat =
          action.seat;
        newState.passengers.children[action.passengerId].isBusinessSeat =
          action.isBusiness;
      }

      return newState;

    default:
      return newState;
  }
};

export default bookingReducer;
