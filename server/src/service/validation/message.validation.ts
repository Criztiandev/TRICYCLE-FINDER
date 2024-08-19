import { z } from "zod";

export const messageValidation = z.object({
  type: z.string(),
  content: z
    .string()
    .min(0, "Message should not empty")
    .max(255, "message is to long"),
  status: z.enum(["sent", "delivered", "read"]),
});
