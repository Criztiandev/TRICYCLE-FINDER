import { z } from "zod";

export const postValidation = z.object({
  content: z
    .string()
    .min(3, "Content is too short")
    .max(255, "Content is too long"),
});

export const commentValidation = z.object({
  id: z.string().min(3, "Please provide Comment id"),
  refID: z.string().optional().nullable(),
  accountID: z.string().optional().nullable(),
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(255, "Comment is too long"),
});

// Like schema
export const likesValidation = z.object({
  id: z.string().min(3, "Please provide Like id"),
  refID: z.string().optional().nullable(),
  accountID: z.string().optional().nullable(),
});

// Follow schema
export const followSchema = z.object({
  id: z.string().min(3, "Please provide Follow id"),
  followerID: z.string().min(3, "Please provide Follower id"),
  followedID: z.string().min(3, "Please provide Followed id"),
  createdAt: z.date(),
});
