import { model, Schema } from "mongoose";
import { MatchValue } from "../interface/match.interface";

const matchSchema = new Schema<MatchValue>({
  runners: [{ type: Schema.Types.ObjectId, ref: "runner" }],
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"] },
  matchDate: { type: Date, default: Date.now },
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
});

export default model("match", matchSchema);
