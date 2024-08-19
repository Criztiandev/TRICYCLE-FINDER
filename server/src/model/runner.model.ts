import mongoose, { Schema } from "mongoose";
import { RunnerValue } from "../interface/runner.interface";

const runnerSchema = new Schema<RunnerValue>({
  accountID: { type: Schema.Types.ObjectId, required: true, ref: "account" },
  runnerPreferences: {
    preferredDistance: { type: String, required: true },
    preferredPace: { type: String, required: true },
    preferredTerrain: { type: String, required: true },
    availableDays: { type: [String], required: true },
  },
  datingPreferences: {
    interestedIn: { type: String, required: true },
    ageRange: { type: String, required: true },
  },
});

export default mongoose.model("runner", runnerSchema);
