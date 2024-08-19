import { z } from "zod";

export const MatchValidationSchema = z.object({
  status: z.enum(["Pending", "Accepted", "Rejected"]),
  matchDate: z.date(),
});
