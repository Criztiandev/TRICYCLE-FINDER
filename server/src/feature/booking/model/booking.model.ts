import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    riderID: {
      type: Schema.ObjectId,
      required: true,
      ref: "account",
    },
    recipientID: {
      type: Schema.ObjectId,
      required: true,
      ref: "account",
    },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);
