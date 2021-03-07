import express from "express";
import fetch from "node-fetch";
import Airport from "../model/Airport.js";

const router = express.Router();

const baseWeatherApiUrl = "http://api.weatherapi.com/";

router.get("/current", async (req, res) => {
  try {
    if (!req.query.airportCode) {
      return res
        .status(400)
        .send("Mandatory parameter 'airportCode' is missing");
    }

    const airport = await Airport.findOne({
      code: req.query.airportCode.toUpperCase()
    });
    const url = `${baseWeatherApiUrl}v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${airport.latitude},${airport.longitude}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json = await response.json();
      return res.status(200).send({
        condition: json.current.condition.text,
        temperature: json.current.temp_c
      });
    }

    res.status(500).send("Unable to  get current weather");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
