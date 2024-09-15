import { z } from "zod";

export const accountValidation = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(64, "First name cannot exceed 64 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(64, "Last name cannot exceed 64 characters"),

  address: z
    .string()
    .min(2, "Address must be at least 2 characters long")
    .max(64, "Address cannot exceed 64 characters"),

  course: z
    .string()
    .min(2, "Course must be at least 2 characters long")
    .max(64, "Course cannot exceed 64 characters"),

  department: z
    .string()
    .min(2, "Department must be at least 2 characters long")
    .max(64, "Department cannot exceed 64 characters"),

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
