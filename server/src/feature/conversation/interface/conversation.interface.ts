import { Types } from "mongoose";

// Define the message schema interface
export interface IMessage {
  sender: Types.ObjectId;
  content: string;
  timestamp: Date;
}

// Define the conversation schema interface
export interface IConversation {
  participants: Types.ObjectId[];
  messages: IMessage[];
}
