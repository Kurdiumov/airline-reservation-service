import mongoose from "mongoose";

const offersSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
);

export default mongoose.model("Offer", offersSchema);
