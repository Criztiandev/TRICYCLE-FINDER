import accountValidation from "@/feature/account/validation/account.validation";
import { z } from "zod";

export const LoginValidation = accountValidation.pick({
  email: true,
  password: true,
});

export const RegistrationValidation = accountValidation.extend({
  confirmPassword: z.string(),
});

export const PersonalInfoStepValidation = accountValidation.pick({
  firstName: true,
  lastName: true,
});

export const AccountInfoStepValidation = accountValidation.pick({
  email: true,
  password: true,
});

export const OtherInfoStepValidation = accountValidation.pick({
  course: true,
  department: true,
});
