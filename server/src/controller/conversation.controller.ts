import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import accountModel from "../model/account.model";
import messageModel from "../model/message.model";
import { AccountSchemaValue } from "../interface/account.interface";
import conversationModel from "../model/conversation.model";
import { io } from "..";
import mongoose from "mongoose";

class ConversationController {
  constructor() {}

  fetchAllConversation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = await conversationModel.find({}).lean();

      res.status(200).json({
        payload: credentials,
        message: "Fetched all conversation",
      });
    }
  );

  fetchAllUserConversation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;

      // Fetch all conversations related to the current user
      const conversations = await conversationModel
        .find({ participants: UID })
        .populate({
          path: "participants",
          select: "firstName lastName",
        })
        .lean();

      // Filter to get the other participant only
      const credentials = conversations.map((conversation) => {
        // Find the opposite participant (not the current user)
        const otherParticipant = conversation.participants.find(
          (participant: any) => participant._id.toString() !== UID
        );

        // Return only the needed fields
        return {
          _id: conversation._id,
          participants: otherParticipant,
          lastMessage: conversation.lastMessage,
          messages: conversation.messages,
        };
      });

      res.status(200).json({
        payload: credentials,
        message: `Fetched all ${UID} conversations`,
      });
    }
  );

  fetchConversationById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: conversationID } = req.params;
      const { UID: senderID } = req.user;

      // if the conversation exist
      const conversation = await conversationModel
        .findOne({
          $or: [
            { _id: conversationID },
            { participants: [senderID, conversationID] },
          ],
        })
        .populate("participants")
        .lean();

      if (!conversation) {
        res.status(200).json({
          payload: {
            conversationID: new mongoose.Types.ObjectId(),
            messages: [],
            participants: [],
          },
          message: "No conversation found",
        });
        return;
      }

      const getFullName = (participant: any): string => {
        return participant
          ? `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim()
          : "Unknown User";
      };

      const [firstPerson, secondPerson] = conversation?.participants;
      const firstPersonFullName = getFullName(firstPerson);
      const secondPersonFullName = getFullName(secondPerson);

      const formattedMessages = conversation.messages.map((message: any) => ({
        _id: message._id.toString(),
        text: message.content,
        createdAt: message.createdAt,
        user: {
          _id: message.senderID,
          name:
            message.senderID.toString() === senderID.toString()
              ? firstPersonFullName
              : secondPersonFullName,
        },
      }));

      // Sort messages by createdAt in descending order
      formattedMessages.sort(
        (a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime()
      );

      res.status(200).json({
        payload: {
          conversationID: conversation?._id,
          messages: formattedMessages,
          participants: [
            { _id: firstPerson._id, name: firstPersonFullName },
            { _id: secondPerson._id, name: secondPersonFullName },
          ],
        },
        message: "Fetched successfully",
      });
    }
  );

  createConversation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID: currentID } = req.user;
      const { targetID } = req.body;

      // don't allow to have a conversation with self
      //   if (targetID === currentID) throw new Error("Are you crazy ?");

      // check of the targetId is existing
      const credentials = await accountModel
        .findById(targetID)
        .select("_id")
        .lean();

      if (!credentials) throw new Error("Account doesn't exist");

      const participants = [currentID, targetID];

      // check if this participants has already a conversation
      const isConversationExist = await conversationModel
        .findOne({ participants })
        .lean()
        .select("_id");

      if (isConversationExist)
        throw new Error("You have already a conversation with this user");

      // create conversation
      const conversation = await conversationModel.create({
        participants,
        lastMessage: "",
      });

      if (!conversation) throw new Error("Failed to create conversation");

      res.status(200).json({
        payload: { _id: conversation.id },
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
