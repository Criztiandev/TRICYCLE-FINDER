import { z } from "zod";

const accountValidation = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(64, "First name cannot exceed 64 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(64, "Last name cannot exceed 64 characters"),

  course: z.string().optional(),
  department: z.string().optional(),

  facebook: z.string().optional(),
  licenseNumber: z.string().optional(),
  bodyNumber: z.string().optional(),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email cannot exceed 255 characters"),

  phoneNumber: z
    .string()
    .min(1, "Contact number is too short")
    .max(11, "Contact is too long"),

  password: z.string(),
});

export default accountValidation;
