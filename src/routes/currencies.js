import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const availableCurrencies = ["USD", "EUR"];

router.get("/", async (req, res) => {
  try {
    await Promise.all(
      availableCurrencies.map((currency) =>
        fetch(
          `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
        )
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((responses) => {
        const currencies = [];
        for (const response of responses) {
          currencies.push({
            code: response.code,
            exchangeRate: response.rates[0].mid
          });
        }
        return res.status(200).send({ exchangeRates: currencies });
      });

    res.status(500).send("Unexpected error occurred while fetching currencies");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
