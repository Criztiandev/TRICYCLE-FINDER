import { z } from "zod";
import preferenceValidation, {
  datingPreference,
  runningPreference,
} from "../validation/preference.validation";

export type PreferenceValue = z.infer<typeof preferenceValidation>;

export type RunnerPreference = z.infer<typeof runningPreference>;
export type DatingPreference = z.infer<typeof datingPreference>;
