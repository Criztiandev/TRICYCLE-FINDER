import { z } from "zod";
import {
  commentValidation,
  likesValidation,
  postValidation,
} from "../service/validation/post.validation";
import { ObjectId } from "mongoose";
import { AccountSchemaValue } from "./account.interface";

export interface PostValue extends z.infer<typeof postValidation> {
  accountID:
    | ObjectId
    | AccountSchemaValue[]
    | AccountSchemaValue
    | Pick<AccountSchemaValue, "firstName" | "lastName" | "location">;
  liked: ObjectId[];
}

export interface PostWithAccount extends PostValue {
  details: Pick<AccountSchemaValue, "firstName" | "lastName" | "location">;
}

export type CommentValue = z.infer<typeof commentValidation>;
export type LikesValue = z.infer<typeof likesValidation>;
