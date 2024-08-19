import { z } from "zod";

// Activity schema (combines your activityValidation and activityPostValidation)
export const activityValidation = z.object({
  id: z.string().min(3, "Please provide Activity id").nullable(),
  runnerID: z.string().optional().nullable(),
  challengeID: z.string().optional().nullable(),
  title: z.string().min(3, "Title is too short").max(64, "Title is too long"),
  content: z
    .string()
    .min(3, "Content is too short")
    .max(255, "Content is too long"),
  type: z.string().min(3, "Type is too short").max(16, "Type is too long"),
  exertion: z
    .string()
    .min(3, "Exertion is too short")
    .max(16, "Exertion is too long"),
  distance: z
    .string()
    .min(3, "Distance is too short")
    .max(64, "Distance is too long"),
  steps: z.string().min(3, "Steps is too short").max(64, "Steps is too long"),
  time: z.string().min(3, "Time is too short").max(64, "Time is too long"),
});

// Activity stats schema
export const activityStatValidation = z.object({
  activityID: z.string().optional().nullable(),
  activityDate: z
    .string()
    .min(3, "Date is too short")
    .max(64, "Date is too long"),
  activityTime: z
    .string()
    .min(3, "Time is too short")
    .max(64, "Time is too long"),
  activityDuration: z
    .string()
    .min(3, "Duration is too short")
    .max(64, "Duration is too long"),
  activityKilometer: z
    .string()
    .min(3, "Kilometer is too short")
    .max(64, "Kilometer is too long"),
});
