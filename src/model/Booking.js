import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  passengers: [
    {
      id: { type: Number, default: 1 },
      type: { type: String, default: "adult", enum: ['adult','child', 'infant'], trim: true, required: true },
      name: { type: String, trim: true, required: true },
      sex: { type: String, default: "male", enum: ['male','female'], trim: true, required: true },
      surname: { type: String, trim: true, required: true },
      seat: { type: String, trim: true },
      isBusinessSeat: {type: Boolean, default: false},
      baggage: { type: Number, default: 0 }
    }
  ]
});

export default mongoose.model("Booking", bookingSchema);
