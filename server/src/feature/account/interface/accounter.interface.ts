import { z } from "zod";
import accountValidation from "../validation/account.validation";
import { ObjectId } from "mongoose";

export interface IAccount extends z.infer<typeof accountValidation> {
  _id?: ObjectId;
  role?: "user" | "rider";
  status: "active" | "inactive";
}
