const passengersLimit = 8;

const initialState = {
  destination: null,
  origin: null,
  originTimezone: "GMT",
  departureDate: new Date(),
  focusedInput: "",
  passengers: {
    adults: 1,
    children: 0,
    infants: 0
  }
};

const searchReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ORIGIN":
      if (!action.origin) {
        newState.originTimezone = null;
      }
      newState.origin = action.origin;
      return newState;
    case "DESTINATION":
      newState.destination = action.destination;
      return newState;
    case "ORIGIN_TIMEZONE":
      newState.originTimezone = action.timezone;
      return newState;
    case "DEPARTURE_DATE":
      newState.departureDate = action.date;
      return newState;
    case "ADULTS":
      if (action.adults > passengersLimit) return newState;
      if (action.adults < 1) return newState;
      if (action.adults < newState.passengers.infants) return newState;

      newState.passengers.adults = action.adults;
      return newState;
    case "CHILDREN":
      if (action.children > passengersLimit) return newState;
      if (action.children < 0) return newState;

      newState.passengers.children = action.children;
      return newState;
    case "INFANTS":
      if (action.infants > passengersLimit) return newState;
      if (action.infants < 0) return newState;
      if (action.infants > newState.passengers.adults) return newState;

      newState.passengers.infants = action.infants;
      return newState;
    case "FOCUSED_INPUT":
      newState.focusedInput = action.input;
      return newState;
    default:
      return newState;
  }
};

export default searchReducer;
