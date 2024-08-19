import { z } from "zod";
import { RunValidationSchema } from "../service/validation/run.validation";
import { ObjectId } from "mongoose";

export type RunValidationValue = z.infer<typeof RunValidationSchema>;

export interface RunValue extends RunValidationValue {
  userID: ObjectId;
}
