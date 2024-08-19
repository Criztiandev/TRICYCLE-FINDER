import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import messageModel from "../model/message.model";
import conversationModel from "../model/conversation.model";
import { io } from "..";
import mongoose from "mongoose";

class MessageController {
  constructor() {}

  sendMessage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: conversationID } = req.params;
      const { UID: senderID } = req.user;
      const { message, targetID } = req.body;

      const messageID = new mongoose.Types.ObjectId();

      const newMessage = {
        _id: messageID,
        senderID,
        content: message,
        readBy: [senderID],
        createdAt: new Date(),
      };

      let conversation;

      console.log(conversationID);

      try {
        // Try to update existing conversation
        conversation = await conversationModel.findOneAndUpdate(
          { _id: conversationID },
          {
            $push: { messages: newMessage },
            $set: { lastMessage: newMessage },
          },
          { new: true, lean: true }
        );

        // If conversation doesn't exist, create a new one
        if (!conversation) {
          conversation = await conversationModel.create({
            _id: conversationID,
            participants: [senderID, targetID],
            messages: [newMessage],
            lastMessage: newMessage,
          });
        }

        const giftedChatMessage = {
          _id: newMessage._id.toString(),
          text: newMessage.content,
          createdAt: newMessage.createdAt,
          user: { _id: senderID },
        };

        io.to(conversationID).emit(
          `conversation-message-${conversationID}`,
          giftedChatMessage
        );

        res.status(200).json({
          payload: conversation._id,
          message: "Message sent successfully",
        });
      } catch (error: any) {
        console.error("Error in sendMessage:", error);
        res.status(400).json({
          message: "Failed to send message",
          error: error.message,
        });
      }
    }
  );
}

export default new MessageController();
