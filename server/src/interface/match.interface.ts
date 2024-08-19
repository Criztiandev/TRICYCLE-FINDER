import { z } from "zod";
import { MatchValidationSchema } from "../service/validation/match.validation";
import { ObjectId } from "mongoose";

export type MatchValidationValue = z.infer<typeof MatchValidationSchema>;

export interface MatchValue extends MatchValidationValue {
  runners: ObjectId[];
  status: "Pending" | "Accepted" | "Rejected";
  matchDate: Date;
  lastMessage: String;
}
