import backendConnector from "../backendConnector";

const setOriginsLoading = (originsLoading) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ORIGINS_LOADING",
      originsLoading
    });

    if (originsLoading === true) {
      dispatch(setOrigins([]));
    }
  };
};

const setDestinationsLoading = (destinationsLoading) => {
  return (dispatch) => {
    dispatch({
      type: "SET_DESTINATIONS_LOADING",
      destinationsLoading
    });

    if (destinationsLoading === true) {
      dispatch(setDestinations([]));
    }
  };
};

const setDatesLoading = (datesLoading) => {
  return (dispatch) => {
    dispatch({
      type: "SET_DATES_LOADING",
      datesLoading
    });

    if (datesLoading === true) {
      dispatch(setAvailableDates([]));
    }
  };
};

const setOrigins = (sources = []) => ({
  type: "SET_AVAILABLE_SOURCES",
  sources
});

const setAvailableDates = (dates = []) => ({
  type: "SET_AVAILABLE_DATES",
  dates
});

const setDestinations = (destinations = []) => ({
  type: "SET_AVAILABLE_DESTINATIONS",
  destinations
});

export const getOriginsAsync = (destination = "") => {
  return (dispatch) => {
    dispatch(setOriginsLoading(true));
    backendConnector.getAvailableSources(destination).then((sources) => {
      dispatch(setOrigins(sources));
      dispatch(setOriginsLoading(false));
    });
  };
};

export const getDestinationsAsync = (origin = "") => {
  return (dispatch) => {
    dispatch(setDestinationsLoading(true));
    backendConnector.getAvailableDestinations(origin).then((destinations) => {
      dispatch(setDestinations(destinations));
      dispatch(setDestinationsLoading(false));
    });
  };
};

export const getDatesAsync = (origin = "", destination = "") => {
  return (dispatch, getState) => {
    dispatch(setDatesLoading(true));
    backendConnector
      .getAvailableDepartureDates(origin, destination)
      .then((dates) => {
        dispatch(setAvailableDates(dates));
        dispatch(setDatesLoading(false));
      });
  };
};
