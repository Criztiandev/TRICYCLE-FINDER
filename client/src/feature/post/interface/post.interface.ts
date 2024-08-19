import { z } from "zod";

import { ObjectId } from "mongoose";
import {
  commentValidation,
  likesValidation,
  postValidation,
} from "../validation/post.validation";
import { AccountDetails } from "@/feature/account/interface/account.interface";

export interface PostValue extends z.infer<typeof postValidation> {
  _id?: ObjectId;
  accountID: ObjectId;
  liked: ObjectId[];
  likeCount?: number;
}

export interface PostDetails extends Omit<PostValue, "liked"> {
  details: Pick<AccountDetails, "firstName" | "lastName" | "location">;
  isLiked?: boolean;
  createdAt: any;
}

export type CommentValue = z.infer<typeof commentValidation>;
export type LikesValue = z.infer<typeof likesValidation>;
