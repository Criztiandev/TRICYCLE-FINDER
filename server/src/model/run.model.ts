import { model, Schema } from "mongoose";
import { RunValue } from "../interface/run.interface";

const runSchema = new Schema<RunValue>({
  date: { type: Date, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
  pace: { type: Number },
  route: {
    type: { type: String, default: "LineString" },
    coordinates: [[Number]],
  },
  elevation: { type: Number },
  notes: { type: String },
});

export default model("run", runSchema);
