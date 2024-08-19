import mongoose, { Schema } from "mongoose";
import {
  PostValue,
  CommentValue,
  LikesValue,
} from "../interface/post.interface";

const postSchema = new mongoose.Schema<PostValue>(
  {
    accountID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "account",
    },
    content: { type: String, required: true },
    liked: [{ type: Schema.ObjectId }],
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema<CommentValue>(
  {
    refID: { type: mongoose.Schema.ObjectId, required: true },
    accountID: { type: mongoose.Schema.ObjectId, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const likesSchema = new mongoose.Schema<LikesValue>(
  {
    refID: { type: mongoose.Schema.ObjectId, required: true },
    accountID: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("post", postSchema);
export const commentModel = mongoose.model("comment", commentSchema);
export const likesModel = mongoose.model("likes", likesSchema);
