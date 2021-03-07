export const getPriceInCurrentCurrency = (priceInPln, currentCurrency, exchangeRates) => {
    const rate = exchangeRates[currentCurrency];
    const convertedPrice = Math.round(priceInPln / rate);
    return `${convertedPrice} ${currentCurrency}`;
  };