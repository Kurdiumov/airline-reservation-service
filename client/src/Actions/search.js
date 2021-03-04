export const setOrigin = (origin) => ({
  type: "ORIGIN",
  origin
});

export const setDestination = (destination) => ({
  type: "DESTINATION",
  destination
});

export const setDepartureDate = (date) => ({
  type: "DEPARTURE_DATE",
  date
});

export const setReturnDate = (date) => ({
  type: "RETURN_DATE",
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