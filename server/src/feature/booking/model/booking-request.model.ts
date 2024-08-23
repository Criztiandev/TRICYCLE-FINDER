import mongoose, { Schema } from "mongoose";

const bookingRequestSchema = new mongoose.Schema(
  {
    bookingID: { type: Schema.ObjectId, required: true, ref: "account" },
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
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("BookingRequest", bookingRequestSchema);
