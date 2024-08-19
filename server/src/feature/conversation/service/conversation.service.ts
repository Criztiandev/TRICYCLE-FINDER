import { ObjectId } from "mongoose";
import { IConversation } from "../interface/conversation.interface";
import conversationRepository from "../repository/conversation.repository";
import { AccountSchemaValue } from "../../../interface/account.interface";

class ConversationService {
  private repository: conversationRepository;

  constructor() {
    this.repository = new conversationRepository();
  }

  public getAllConversations = () => {
    return this.repository.fetchAllConversation();
  };

  /**
   *
   * @param UID The ID of the User
   * @returns
   */
  public getAllUserConversations = async (UID: string) => {
    const conversations = await this.repository.fetchAllConversationById(UID);

    return conversations.map((details) => {
      const targetUser = details.participants.find(
        (participant: any) => participant._id.toString() !== UID
      );

      return {
        ...details,
        participants: targetUser,
      };
    });
  };

  public getConversationByHits = async (conversationID: string) => {
    return await this.repository.fetchConversationByFilter(
      {
        $or: [
          { _id: conversationID },
          { participants: { $all: [conversationID] } },
        ],
      },
      { path: "participants", select: "firstName lastName" }
    );
  };

  public getFormatedConversation = async (allegedlyCID: any, senderID: any) => {
    const conversation = await this.getConversationByHits(allegedlyCID);

    if (!conversation) throw new Error("Conversation doest exist");

    const [firstPerson, secondPerson] = conversation?.participants;
    const firstPersonFullName = this.getParticipantsFullName(firstPerson);
    const secondPersonFullName = this.getParticipantsFullName(secondPerson);

    const recipient =
      firstPerson._id.toString() === senderID.toString()
        ? secondPerson
        : firstPerson;
    const recipientFullName =
      recipient === secondPerson ? secondPersonFullName : firstPersonFullName;

    const formattedMessages = conversation.messages.map(
      (message: any, index: number) => ({
        _id: `${message._id.toString()}_${index}`, // Ensure uniqueness by adding index
        text: message.content,
        createdAt: message.createdAt,
        user: {
          _id: message.senderID,
          name:
            message.senderID.toString() === senderID.toString()
              ? firstPersonFullName
              : secondPersonFullName,
        },
      })
    );

    return {
      recipient: {
        _id: recipient._id,
        name: recipientFullName,
      },
      conversationID: conversation?._id,
      messages: formattedMessages.reverse(),
      participants: [
        { _id: firstPerson._id, name: firstPersonFullName },
        { _id: secondPerson._id, name: secondPersonFullName },
      ],
    };
  };

  public createNewConversation = async (payload: IConversation) => {
    const [senderID, recipientID] = payload.participants as any;
    // check if conversation exist
    const credentials = await this.getConversationByHits(recipientID);
    if (credentials) throw new Error("Conversation already exist");

    const newConversation = (
      await this.repository.createConversation(payload)
    ).populate({
      path: "participants",
      select: "firstName lastName",
    });
    if (!newConversation) throw new Error("Create Conversation Failed");
    return newConversation;
  };

  // Helpers

  getParticipantsFullName = (participant: any): string => {
    return participant
      ? `${participant.firstName || ""} ${participant.lastName || ""}`.trim()
      : "Unknown User";
  };
}

export default ConversationService;
