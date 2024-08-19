import { io } from "../../..";
import ConversationRepository from "../repository/conversation.repository";
import MessageRepository from "../repository/messages.repository";

class MessageService {
  private repository: MessageRepository;
  private conversationRepository: ConversationRepository;
  constructor() {
    this.repository = new MessageRepository();
    this.conversationRepository = new ConversationRepository();
  }

  public sendMessage = async (
    conversationID: string,
    formattedMessage: any
  ) => {
    const updatedConversation =
      await this.conversationRepository.InsertMessageConversation(
        conversationID,
        formattedMessage
      );

    if (!updatedConversation) throw new Error("Send Message Failed");

    const giftedChatMessage = {
      _id: formattedMessage._id.toString(),
      text: formattedMessage.content,
      createdAt: formattedMessage.createdAt,
      user: { _id: formattedMessage.senderID },
    };

    io.to(conversationID).emit(
      `conversation-message-${conversationID}`,
      giftedChatMessage
    );

    return updatedConversation;
  };
}

export default MessageService;
