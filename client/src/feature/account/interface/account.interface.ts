import { z } from "zod";
import accountValidation from "../validation/account.validation";
import { PreferenceValue } from "./preference.interface";
import { ObjectId } from "mongoose";

export interface IAccount extends z.infer<typeof accountValidation> {
  _id?: string | ObjectId;
  UID?: string | ObjectId;
  role?: "user" | "rider";
}

export interface IStoredDetails {
  UID: string;
  role: "user" | "rider";
  verified?: boolean;
}
