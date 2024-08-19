import { FilterQuery, ObjectId, PopulateOptions } from "mongoose";
import conversationModel from "../../../model/conversation.model";
import { IConversation } from "../interface/conversation.interface";

class ConversationRepository {
  constructor() {}

  public fetchAllConversation = async () => {
    return await conversationModel.find({});
  };

  public fetchAllConversationById = async (UID: string | string[]) => {
    return await conversationModel
      .find({ participants: UID })
      .populate({
        path: "participants",
        select: "firstName lastName",
      })
      .lean();
  };

  public async fetchAllConversationByFilter(
    filter: FilterQuery<any>,
    populate: PopulateOptions
  ): Promise<any | null> {
    return await conversationModel
      .find(filter)
      .populate(populate)
      .lean()
      .exec(); // It's a good practice to use exec() when working with Mongoose queries
  }

  public async fetchConversationByFilter(
    filter: FilterQuery<IConversation>,
    populate: PopulateOptions
  ) {
    return await conversationModel
      .findOne(filter)
      .populate(populate)
      .lean()
      .exec(); // It's a good practice to use exec() when working with Mongoose queries
  }

  public async createConversation(payload: IConversation) {
    return await conversationModel.create(payload);
  }

  public async InsertMessageConversation(
    conversationID: ObjectId | string,
    formattedMessage: any
  ) {
    return await conversationModel.findOneAndUpdate(
      { _id: conversationID },
      {
        $push: { messages: formattedMessage },
        $set: { lastMessage: formattedMessage },
      },
      { new: true, lean: true }
    );
  }
}

export default ConversationRepository;
