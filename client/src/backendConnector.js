const flightsUrl = `${process.env.REACT_APP_API_URL}/api/flights?`;
const airportsUrl = `${process.env.REACT_APP_API_URL}/api/airports?`;
const airportDetailsUrl = `${process.env.REACT_APP_API_URL}/api/airports/details?`;
const airportNearestUrl = `${process.env.REACT_APP_API_URL}/api/airports/nearest?`;

const availableSourcesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableSources?`;
const availableDestinationsUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDestinations?`;
const availableDatesUrl = `${process.env.REACT_APP_API_URL}/api/flights/availableDates?`;

const currenciesUrl = `${process.env.REACT_APP_API_URL}/api/currencies/`;

const currentWeatherUrl = `${process.env.REACT_APP_API_URL}/api/weather/current?`;

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

  const dates = json?.dates;
  return dates;
};

const getCurrencies = async () => {
  const json = await fetchFromBackend(currenciesUrl);
  return json?.exchangeRates;
};

const getNearestAirport = async (latitude, longitude) => {
  const json = await fetchFromBackend(airportNearestUrl, {
    latitude: latitude,
    longitude: longitude
  });
  return json;
};

const getCurrentWeather = async (airportCode) => {
  const json = await fetchFromBackend(currentWeatherUrl, {
    airportCode: airportCode
  });
  return json;
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
  getNearestAirport: getNearestAirport,
  getAirportDetails: getAirportDetails,
  getAvailableSources: getAvailableSources,
  getAvailableDestinations: getAvailableDestinations,
  getAvailableDepartureDates: getAvailableDepartureDates,
  getCurrencies: getCurrencies,
  getCurrentWeather: getCurrentWeather
};

export default backendConnector;
