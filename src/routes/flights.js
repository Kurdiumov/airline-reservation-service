import express from "express";
import Flight from "../model/Flight.js";
import Airport from "../model/Airport.js";

const router = express.Router();

router.get("/availableSources", async (req, res) => {
  let origins;
  const result = {};

  try {
    if (req.query.destination) {
      origins = await Flight.distinct("origin", {
        destination: req.query.destination.toUpperCase()
      });
    } else {
      origins = await Flight.distinct("origin");
    }

    for (const origin of origins) {
      const airport = await Airport.findOne({ code: origin });
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
  let destinations;
  const result = {};

  try {
    if (req.query.origin) {
      destinations = await Flight.distinct("destination", {
        origin: req.query.origin.toUpperCase()
      });
    } else {
      destinations = await Flight.distinct("destination");
    }

    for (const destination of destinations) {
      const airport = await Airport.findOne({ code: destination });
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
