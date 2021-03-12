import backendConnector from "../backendConnector.js";
import { getDatesAsync, getDestinationsAsync, getOriginsAsync } from "./data";

export const setOrigin = (origin) => {
  return (dispatch, getState) => {
    dispatch(setOriginTimezone(null));
    dispatch({
      type: "ORIGIN",
      origin
    });

    if (getState().search.origin) {
      backendConnector
        .getAirportDetails(getState().search.origin.code)
        .then(({ timezone }) => {
          dispatch(setOriginTimezone(timezone));
        });
    }

    if (!getState().search.origin && getState().search.destination) {
      dispatch(getOriginsAsync(getState().search.destination.code))
    }

    if (!getState().search.destination && getState().search.origin) {
      dispatch(getDestinationsAsync(getState().search.origin.code));
    }

    if (getState().search.origin && getState().search.destination) {
      dispatch(
        getDatesAsync(
          getState().search.origin.code,
          getState().search.destination.code
        )
      );
    }
  };
};

export const setDestination = (destination) => {
  return (dispatch, getState) => {
    dispatch({
      type: "DESTINATION",
      destination
    });

    if (!getState().search.destination && getState().search.origin) {
      dispatch(getDestinationsAsync(getState().search.origin.code))
    }

    if (!getState().search.origin && getState().search.destination) {
      dispatch(getOriginsAsync(getState().search.destination.code));
    }

    if (getState().search.origin && getState().search.destination) {
      dispatch(
        getDatesAsync(
          getState().search.origin.code,
          getState().search.destination.code
        )
      );
    }
  };
};

export const setOriginTimezone = (timezone) => ({
  type: "ORIGIN_TIMEZONE",
  timezone
});

export const setDepartureDate = (date) => ({
  type: "DEPARTURE_DATE",
  date
});

export const setAdultPassengers = (adults) => ({
  type: "ADULTS",
  adults
});

export const setChildrenPassengers = (children) => ({
  type: "CHILDREN",
  children
});

export const setInfantPassengers = (infants) => ({
  type: "INFANTS",
  infants
});

export const setFocusedInput = (input) => ({
  type: "FOCUSED_INPUT",
  input
})
