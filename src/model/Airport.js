import mongoose from "mongoose";

const airportSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    }
  },
);

export default mongoose.model("Airport", airportSchema);
