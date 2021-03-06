import express from "express";
import moment from "moment";
import momentTimezone from "moment-timezone";
import Flight from "../model/Flight.js";
import Booking from "../model/Booking.js";
import Airport from "../model/Airport.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.origin) {
      return res.status(400).send("Mandatory parameter 'origin' is missing");
    }

    if (!req.query.destination) {
      return res
        .status(400)
        .send("Mandatory parameter 'destination' is missing");
    }

    if (!req.query.date) {
      return res.status(400).send("Mandatory parameter 'date' is missing");
    }

    const originAirport = await Airport.findOne({ code: req.query.origin });
    const dateFrom = moment.tz(
      req.query.date,
      "YYYY-MM-DD",
      originAirport.timezone
    );
    const dateTo = dateFrom.clone().add(24, "hours");

    const flights = await Flight.find({
      origin: req.query.origin,
      destination: req.query.destination,
      departureTime: {
        $gte: dateFrom.toDate(),
        $lt: dateTo.toDate()
      }
    });

    res.json({
      flights: flights
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/flightId", async (req, res) => {
  try {
    const flight = await Flight.findOne({
      flightNumber: req.params.flightId
    });

    if (flight) {
      return res.json({
        flight: flight
      });
    }

    res
      .status(404)
      .send(`Flight with id ${req.params.flightId} does not exist.`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/getBusySeats/:flightId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      flightNumber: req.params.flightId
    });

    const busySeats = [];
    bookings.forEach((booking) => {
      Object.values(booking.passengers).forEach((passenger) => {
        if (passenger && passenger.seat) {
          busySeats.push(passenger.seat);
        }
      });
    });

    return res.json({
      busySeats: busySeats
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

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

router.get("/availableDates", async (req, res) => {
  try {
    if (!req.query.origin) {
      return res.status(400).send("Mandatory parameter 'origin' is missing");
    }

    if (!req.query.destination) {
      return res
        .status(400)
        .send("Mandatory parameter 'destination' is missing");
    }

    const dates = await Flight.distinct("departureTime", {
      origin: req.query.origin,
      destination: req.query.destination,
      departureTime: {
        $gte: new Date()
      }
    });

    res.json({
      dates: dates
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
