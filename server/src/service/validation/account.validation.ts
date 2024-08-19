import { z } from "zod";
import preferenceValidation from "./runner.validation";

const calculateAge = (birthday: Date): number => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const accountValidation = z.object({
  profilePicture: z.string().optional(),
  userName: z
    .string()
    .min(2, "User name name must be at least 2 characters long")
    .max(64, "User name name cannot exceed 64 characters"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(64, "First name cannot exceed 64 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(64, "Last name cannot exceed 64 characters"),

  dateOfBirth: z.string(),

  // dateOfBirth: z.date().refine((date) => calculateAge(date) >= 18, {
  //   message: "User must be at least 18 years old",
  // }),

  gender: z
    .enum(["male", "female", "other"], {
      errorMap: (issue, ctx) => {
        console.log("Gender validation error:", issue, ctx);
        return { message: "Please select a valid gender option" };
      },
    })
    .describe("Gender"),

  bio: z.string().max(500).optional(),

  location: z
    .object({
      type: z.literal("Point"),
      coordinates: z.tuple([z.number(), z.number()]),
    })
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email cannot exceed 255 characters"),

  password: z.string(),

  // password: z
  //   .string()
  //   .min(8, "Password must be at least 8 characters long")
  //   .max(128, "Password cannot exceed 128 characters")
  //   .regex(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  //   ),
});

export const accountPreferenceValidation =
  accountValidation.merge(preferenceValidation);
