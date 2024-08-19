import mongoose, { Document } from "mongoose";
import {
  ActivityValue,
  ActivityStatsValue,
} from "../interface/activity.interface";

const activitySchema = new mongoose.Schema<ActivityValue>(
  {
    runnerID: { type: mongoose.Schema.ObjectId, required: true },
    challengeID: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    exertion: { type: String, required: true },
    distance: { type: String, required: true },
    steps: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const activityStatsSchema = new mongoose.Schema<ActivityStatsValue>(
  {
    activityID: { type: mongoose.Schema.ObjectId, required: true },
    activityDate: { type: String, required: true },
    activityTime: { type: String, required: true },
    activityDuration: { type: String, required: true },
    activityKilometer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const activityModel = mongoose.model("activity", activitySchema);
export const activityStatsModel = mongoose.model(
  "activity-stats",
  activityStatsSchema
);
