const initialState = {
  selectedFlight: null,
};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_FLIGHT":
      newState.selectedFlight = action.flight;
      return newState;
    default:
      return newState;
  }
};

export default bookingReducer;
