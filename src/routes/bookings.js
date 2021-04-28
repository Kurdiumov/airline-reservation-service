import express from "express";
import Booking from "../model/Booking.js";
import Flight from "../model/Flight.js";
import Airport from "../model/Airport.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({});

    return res.status(200).send({
      bookings: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  // It would be nice to have some validation here...
  const booking = new Booking({
    flightNumber: req.body.flightNumber,
    userId: req.token.userId,
    passengers: req.body.passengers
  });

  try {
    const savedBooking = await booking.save();
    return res.status(201).send({ booking: savedBooking._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/mybookings", authenticateJWT, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.token.userId
    }).lean();

    await Promise.all(bookings.map(async (booking) => {
      const flight = await Flight.findOne({
        flightNumber: booking.flightNumber
      });

      const origin = await Airport.findOne({
        code: flight.origin
      }).lean();
      const destination = await Airport.findOne({
        code: flight.destination
      }).lean();

      booking.originDetails = origin;
      booking.destinationDetails = destination;

      booking.businessPrice = flight.businessPrice;
      booking.economyPrice = flight.economyPrice;
      booking.baggagePrice = flight.luggagePrice;
    }));

    return res.json({ bookings: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
