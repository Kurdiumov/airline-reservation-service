const initialState = {
  selectedFlight: null,
  passengersCount: {
    adults: 1,
    children: 0,
    infants: 0
  }
};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_FLIGHT":
      newState.selectedFlight = action.flight;
      return newState;
    case "SET_PASSENGERS_COUNT":
      newState.passengersCount.adults = action.adults;
      newState.passengersCount.children = action.children;
      newState.passengersCount.infants = action.infants;
      return newState;
    default:
      return newState;
  }
};

export default bookingReducer;
