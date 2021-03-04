const flightsUrl = `${process.env.REACT_APP_API_URL}/api/flights/?`;
const airportsUrl = `${process.env.REACT_APP_API_URL}/api/airports?`;
const airportDetailsUrl = `${process.env.REACT_APP_API_URL}/api/airports/details/?`;
const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources?`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDestinations?`;
const availableDatesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDates?`;

const getFlights = async (origin, destination, date) => {
  const json = await fetchFromBackend(flightsUrl, {
    origin: origin,
    destination: destination,
    date: date
  });

  return json?.flights;
};

const getAirports = async () => {
  const json = await fetchFromBackend(airportsUrl);
  return json.airports;
};

const getAirportDetails = async (code) => {
  const airport = await fetchFromBackend(airportDetailsUrl, { code: code });
  return airport;
};

const getAvailableSources = async (destinationCode) => {
  const params = destinationCode ? { destination: destinationCode } : null;
  const json = await fetchFromBackend(availableSourcesUrl, params);
  return json?.sources;
};

const getAvailableDestinations = async (originCode) => {
  const params = originCode ? { origin: originCode } : null;
  const json = await fetchFromBackend(availableDestinationsUrl, params);

  return json?.destinations;
};

const getAvailableDepartureDates = async (originCode, destinationCode) => {
  const json = await fetchFromBackend(availableDatesUrl, {
    origin: originCode,
    destination: destinationCode
  });

  const dates = json?.dates.map((date) => (new Date(date)).toISOString().substring(0, 10));
  return dates;
};

const fetchFromBackend = async (url, params) => {
  try {
    let fullUrl = url;
    if (params) {
      fullUrl += new URLSearchParams(params);
    }
    const response = await fetch(fullUrl);
    if (response.status === 200) {
      return await response.json();
    }
    console.warn("Received unexpected response code: ", response.status);
  } catch (err) {
    console.error(err);
  }
  return null;
};

const backendConnector = {
  getFlights: getFlights,
  getAirports: getAirports,
  getAirportDetails: getAirportDetails,
  getAvailableSources: getAvailableSources,
  getAvailableDestinations: getAvailableDestinations,
  getAvailableDepartureDates: getAvailableDepartureDates
};

export default backendConnector;
