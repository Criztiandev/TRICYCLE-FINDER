import { z } from "zod";
import {
  activityStatValidation,
  activityValidation,
} from "../service/validation/activity.validation";

export type ActivityValue = z.infer<typeof activityValidation>;
export type ActivityStatsValue = z.infer<typeof activityStatValidation>;
