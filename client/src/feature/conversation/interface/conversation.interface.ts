import { AccountDetails } from "@/feature/account/interface/account.interface";
import { ObjectId } from "mongoose";
import { z } from "zod";

export interface Conversation {
  _id?: string | ObjectId;
  participants: Pick<AccountDetails, "firstName" | "lastName" | "_id">[];
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
