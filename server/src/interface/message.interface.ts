import { z } from "zod";
import { messageValidation } from "../service/validation/message.validation";
import { ObjectId } from "mongoose";

export interface Message extends z.infer<typeof messageValidation> {
  conversationId: ObjectId;
  senderId: ObjectId;
}
