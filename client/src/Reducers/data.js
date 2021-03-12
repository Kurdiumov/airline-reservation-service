const initialState = {
  availableSources: [],
  availableDestinations: [],
  availableDates: [],
  originsLoading: false,
  destinationsLoading: false,
  datesLoading: false
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AVAILABLE_SOURCES":
      return { ...state, availableSources: action.sources };
    case "SET_AVAILABLE_DESTINATIONS":
      return { ...state, availableDestinations: action.destinations };
    case "SET_AVAILABLE_DATES":
      return { ...state, availableDates: action.dates };
    case "SET_ORIGINS_LOADING":
      return { ...state, originsLoading: action.originsLoading };
    case "SET_DESTINATIONS_LOADING":
      return { ...state, destinationsLoading: action.destinationsLoading };
    case "SET_DATES_LOADING":
      return { ...state, datesLoading: action.datesLoading };
    default:
      return state;
  }
};

export default dataReducer;
