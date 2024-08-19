import { z } from "zod";
import accountValidation from "../validation/account.validation";
import { PreferenceValue } from "./preference.interface";
import { ObjectId } from "mongoose";

export type AccountBase = z.infer<typeof accountValidation>;

export interface AccountDetails extends Omit<AccountBase, "password"> {
  _id?: string | ObjectId;
  role?: string;
  followingCount?: number;
  followersCount?: number;
}

export interface AccountWithPreferenceValue
  extends AccountDetails,
    PreferenceValue {}
