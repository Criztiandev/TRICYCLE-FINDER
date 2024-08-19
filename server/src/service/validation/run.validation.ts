import { z } from "zod";

export const RunValidationSchema = z.object({
  date: z.date(),
  distance: z.number().positive(),
  duration: z.number().positive(),
  pace: z.number().positive().optional(),
  route: z
    .object({
      type: z.literal("LineString"),
      coordinates: z.array(z.tuple([z.number(), z.number()])),
    })
    .optional(),
  elevation: z.number().optional(),
  notes: z.string().max(1000).optional(),
});
