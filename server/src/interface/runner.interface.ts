import { z } from "zod";
import { RunValue } from "./run.interface";
import { ObjectId } from "mongoose";
import preferenceValidation from "../service/validation/runner.validation";

export interface RunnerValue extends z.infer<typeof preferenceValidation> {
  accountID: ObjectId;
  runs: RunValue[];
}
