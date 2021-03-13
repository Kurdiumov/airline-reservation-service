const initialState = {
  selectedFlight: null,
  passengers: {
    adults: {},
    children: {},
    infants: {}
  }
};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_FLIGHT":
      newState.selectedFlight = action.flight;
      return newState;
    case "SET_PASSENGERS":
      newState.passengers.adults = action.adults;
      newState.passengers.children = action.children;
      newState.passengers.infants = action.infants;
      return newState;

    case "SET_PASSENGER":
      if (action.passengerType === "ADULT") {
        newState.passengers.adults[action.id] = action.value;
      } else if (action.passengerType === "CHILD") {
        newState.passengers.children[action.id] = action.value;
      } else if (action.passengerType === "INFANT") {
        newState.passengers.infants[action.id] = action.value;
      }

      return newState;

    default:
      return newState;
  }
};

export default bookingReducer;
