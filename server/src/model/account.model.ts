import mongoose from "mongoose";
import { AccountSchemaValue } from "../interface/account.interface";

const accountScgema = new mongoose.Schema<AccountSchemaValue>(
  {
    profilePicture: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    role: { type: String, default: "user", required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "account" }], // Reference to User model
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "account" }], // Reference to User model
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("account", accountScgema);
