import express from "express";
import Airport from "../model/Airport.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const airports = await Airport.find({});

    if (airports && airports.length > 0) {
      return res.json({ airports: airports });
    }
    res.status(500).send("Airports is not an array");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/details", async (req, res) => {
  try {
    if (!req.query.code) {
      return res.status(400).send("Mandatory parameter 'code' is missing");
    }

    const airport = await Airport.findOne({
      code: req.query.code.toUpperCase()
    });

    if (airport) {
      return res.json({
        code: airport.code,
        name: airport.name,
        city: airport.city,
        country: airport.country,
        latitude: airport.latitude,
        longitude: airport.longitude,
        timezone: airport.timezone
      });
    }
    res.status(404).send(`Airport with code ${req.query.code} not found.`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
