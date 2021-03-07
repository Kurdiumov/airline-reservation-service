const initialState = {
  currentCurrency: "PLN",
  exchangeRates: {
    PLN: 1,
    USD: 3.8,
    EUR: 4.5
  }
};

const currencyReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_CURRENCY":
      const currency = action.currency.toUpperCase();
      if (Object.keys(newState.exchangeRates).includes(currency)) {
        newState.currentCurrency = currency;
      }

      return newState;
    case "SET_EXCHANGE_RATE":
      for (const rate of action.exchangeRates) {
        const currency = rate.code.toUpperCase();
        if (Object.keys(newState.exchangeRates).includes(currency)) {
          newState.exchangeRates[currency] = rate.exchangeRate;
        }
      }

      return newState;
    default:
      return newState;
  }
};

export default currencyReducer;
