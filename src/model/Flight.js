import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    aircraftModel: {
      type: String,
      required: true,
    },
    economyPrice: {
      type: Number,
      required: true,
    },
    businessPrice: {
      type: Number,
      required: true,
    },
    luggagePrice: {
      type: Number,
      required: true,
    }
  },
);

export default mongoose.model("Flight", flightSchema);
