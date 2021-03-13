import store from "./store";

export const getPriceInCurrentCurrency = (priceInPln) => {
  const currentCurrency = store.getState().currencies.currentCurrency;
  const exchangeRates = store.getState().currencies.exchangeRates;

  const rate = exchangeRates[currentCurrency];
  const convertedPrice = Math.round(priceInPln / rate);
  return `${convertedPrice} ${currentCurrency}`;
};
