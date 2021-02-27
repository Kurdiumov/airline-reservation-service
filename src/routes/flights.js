import express from "express";
import Flight from "../model/Flight.js";
import Airport from "../model/Airport.js";

const router = express.Router();

router.get("/availableSources", async (req, res) => {
  let flights;
  const result = {};
  const processedAirports = [];

  try {
    if (req.query.destination) {
      flights = await Flight.find({
        destination: req.query.destination.toUpperCase()
      });
    } else {
      flights = await Flight.find();
    }

    for (const flight of flights) {
      if (processedAirports.includes(flight.origin)) {
        continue;
      }
      processedAirports.push(flight.origin);

      const airport = await Airport.findOne({ code: flight.origin });
      if (!result[airport.country]) {
        result[airport.country] = [];
      }

      result[airport.country].push({
        code: airport.code,
        name: airport.name
      });
    }

    res.json({
      sources: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/availableDestinations", async (req, res) => {
  let flights;
  const result = {};
  const processedAirports = [];

  try {
    if (req.query.origin) {
      flights = await Flight.find({
        origin: req.query.origin.toUpperCase()
      });
    } else {
      flights = await Flight.find();
    }

    for (const flight of flights) {
      if (processedAirports.includes(flight.destination)) {
        continue;
      }
      processedAirports.push(flight.destination);

      const airport = await Airport.findOne({ code: flight.destination });
      if (!result[airport.country]) {
        result[airport.country] = [];
      }

      result[airport.country].push({
        code: airport.code,
        name: airport.name
      });
    }

    res.json({
      destinations: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
