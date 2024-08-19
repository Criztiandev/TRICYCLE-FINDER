import { z } from "zod";
import { accountValidation } from "./account.validation";

export const loginValidation = accountValidation.pick({
  email: true,
  password: true,
});

export const registrationValidation = accountValidation
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnt match",
    path: ["confirmPassword"],
  });
