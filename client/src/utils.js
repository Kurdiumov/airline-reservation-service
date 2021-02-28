export const getLocaleDateString = (dateTime) => {
  const timeZoneOffset = dateTime.getTimezoneOffset() * 60000;
  return new Date(dateTime - timeZoneOffset).toISOString().slice(0, 10);
};
