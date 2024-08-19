import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
      },
    ],
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("conversation", conversationSchema);
