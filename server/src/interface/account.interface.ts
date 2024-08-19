import { z } from "zod";
import { accountValidation } from "../service/validation/account.validation";
import { ObjectId } from "mongoose";
import { PreferenceValue } from "./preference.interface";

export interface AccountSchemaValue extends z.infer<typeof accountValidation> {
  role: string;
  following?: ObjectId[];
  followers?: ObjectId[];
  followingCount?: number;
  followersCount?: number;
}

export interface AccountWithPreferenceValue
  extends AccountSchemaValue,
    PreferenceValue {}
