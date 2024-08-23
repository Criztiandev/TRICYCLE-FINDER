import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    accountID: { type: mongoose.Schema.ObjectId, required: true },
    senderID: { type: mongoose.Schema.ObjectId, required: true },
    rating: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("rating", ratingSchema);
