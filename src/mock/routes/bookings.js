import express from "express";
import Flight from "../../model/Flight.js";
import Booking from "../../model/Booking.js";
import { embraer, airbus, boeing } from "../planeSeats.js";

const router = express.Router();
const mockUserId = "608e882bd1bc42feaa1de297";

const getSeatsForPlane = (model) => {
  if (model === "Embraer E175") return embraer;
  if (model === "Airbus A320neo") return airbus;
  if (model === "boeing 747-400") return boeing;
  return [];
};

router.get("/populate", async (req, res) => {
  try {
    const flights = await Flight.find({});
    console.log("Length of flights: ", flights.length);

    flights.forEach(async (flight) => {
      const busySeats = [];

      const iterations =
        getSeatsForPlane(flight.aircraftModel).length /
        Math.floor(Math.random() * 5 + 5);

      for (let i = 0; i < iterations; i++) {
        const availableSeats = getSeatsForPlane(flight.aircraftModel).filter(
          (seat) => !busySeats.includes(seat)
        );
        const seat =
          availableSeats[Math.floor(Math.random() * availableSeats.length)];
        busySeats.push(seat);

        const booking = new Booking({
          flightNumber: flight.flightNumber,
          userId: mockUserId,
          passengers: [
            {
              id: 1,
              sex: "male",
              isBusinessSeat: false,
              baggage: 0,
              name: "Mock user",
              surname: " Mock user",
              seat: seat
            }
          ]
        });

        try {
          await booking.save();
        } catch (err) {
          console.error(err);
        }
      }
    });

    return res.json({ status: "Booking generation started" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
