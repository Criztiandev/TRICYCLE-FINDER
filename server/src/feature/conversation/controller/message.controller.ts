import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import MessageService from "../service/message.service";
import ConversationService from "../service/conversation.service";

class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  sendMessage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: conversationID } = req.params;
      const { UID: senderID } = req.user;
      const { message } = req.body;

      const formattedMessage = {
        _id: new mongoose.Types.ObjectId(),
        senderID,
        content: message,
        readBy: [senderID],
        createdAt: new Date(),
      };

      const conversation = await this.messageService.sendMessage(
        conversationID,
        formattedMessage
      );

      res.status(200).json({
        payload: conversation._id,
        message: "Message sent successfully",
      });
    }
  );
}

export default new MessageController();
