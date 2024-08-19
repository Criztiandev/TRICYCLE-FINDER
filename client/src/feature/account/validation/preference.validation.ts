import { z } from "zod";

const preferenceValidation = z.object({
  runnerPreferences: z.object({
    preferredDistance: z.string(),
    preferredPace: z.string(),
    preferredTerrain: z.string(),
    availableDays: z.string(),
  }),

  datingPreferences: z.object({
    interestedIn: z.string(),
    ageRange: z.string(),
  }),
});

export const runningPreference = preferenceValidation.pick({
  runnerPreferences: true,
});
export const datingPreference = preferenceValidation.pick({
  datingPreferences: true,
});

export default preferenceValidation;
