import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import accountModel from "../../account/model/account.model";
import messageModel from "../../../model/message.model";
import { AccountSchemaValue } from "../../../interface/account.interface";
import conversationModel from "../../../model/conversation.model";
import mongoose from "mongoose";
import ConversationService from "../service/conversation.service";

class ConversationController {
  private conversationService: ConversationService;
  constructor() {
    this.conversationService = new ConversationService();
  }

  fetchAllConversation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = this.conversationService.getAllConversations();

      res.status(200).json({
        payload: credentials,
        message: "Fetched all conversation",
      });
    }
  );

  fetchAllUserConversation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;

      const credentials =
        await this.conversationService.getAllUserConversations(UID);

      res.status(200).json({
        payload: credentials,
        message: `Fetched all ${UID} conversations`,
      });
    }
  );

  fetchConversationById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: conversationID } = req.params;
      const { UID: currentUser } = req.user;

      const conversation =
        await this.conversationService.getFormatedConversation(
          conversationID,
          currentUser
        );

      res.status(200).json({
        payload: conversation,
        message: "Fetched successfully",
      });
    }
  );

  createConversation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID: currentID } = req.user;
      const { targetID } = req.body;

      // check if both has a conversation
      const conversation = await this.conversationService.getConversationByHits(
        targetID
      );

      if (conversation) {
        res.status(200).json({
          payload: { conversationID: conversation._id },
          message: "Created successfully",
        });
      }

      const newConversation =
        await this.conversationService.createNewConversation({
          participants: [currentID, targetID],
          messages: [],
        });

      if (!newConversation) throw new Error("Failed to create conversation");

      res.status(200).json({
        payload: { conversationID: newConversation._id },
        message: "Created successfully",
      });
    }
  );

  deleteConversation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      console.log("Deleting the conversation");
    }
  );
}

export default new ConversationController();
