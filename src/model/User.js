import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255
    },
    surname: {
      type: String,
      required: true,
      min: 2,
      max: 255
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
