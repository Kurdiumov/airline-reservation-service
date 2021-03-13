const initialState = {
  selectedFlight: null,
  baggagePrice: 0,
  passengers: {
    adults: {},
    children: {},
    infants: {}
  }
};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_FLIGHT_NUMBER":
      newState.selectedFlight = action.flightNumber;
      return newState;
    case "SET_BAGGAGE_PRICE_PER_ITEM":
      newState.baggagePrice = action.price;
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

    default:
      return newState;
  }
};

export default bookingReducer;
