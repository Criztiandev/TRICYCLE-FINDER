import { ObjectId } from "mongoose";

export interface Conversation {
  participants: ObjectId[];
  lastMessage: string;
}
