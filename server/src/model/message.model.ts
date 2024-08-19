import mongoose from "mongoose";
import { Message } from "../interface/message.interface";

const messageSchema = new mongoose.Schema<Message>(
  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: "conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "account",
      require: true,
    },
    content: { type: String, required: true },
    type: { type: String, require: true, default: "text" },
    status: {
      type: String,
      enum: ["read", "sent", "delivered"],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
