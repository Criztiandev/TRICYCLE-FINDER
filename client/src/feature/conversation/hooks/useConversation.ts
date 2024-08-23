import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";
import { IMessage } from "react-native-gifted-chat";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

interface ConversationData {
  recipient: {
    _id: string;
    name: string;
    phoneNumber: string;
  };
  conversationID: string;
  messages: IMessage[];
}

const SOCKET_URL = "http://192.168.1.6:4000";

const useConversation = (conversationID: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchConversation = useCallback(async (): Promise<ConversationData> => {
    const { data } = await ProtectedAxios.get(
      `/conversation/${conversationID}`
    );
    const { messages: fetchedMessages } = data?.payload;
    setMessages(fetchedMessages);
    return data?.payload;
  }, []);

  const query = useFetch({
    queryKey: [`conversation-${conversationID}`],
    queryFn: fetchConversation,
  });

  useEffect(() => {
    if (!conversationID) return;

    const socket = io(SOCKET_URL);

    const handleNewMessage = (newMessage: IMessage) => {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [newMessage])
      );
    };

    socket.emit("conversation-join", conversationID);
    socket.on(`conversation-message-${conversationID}`, handleNewMessage);

    return () => {
      socket.emit("conversation-leave", conversationID);
      socket.off(`conversation-message-${conversationID}`);
      socket.disconnect();
    };
  }, [conversationID]);

  return { query, messages, setMessages };
};

export default useConversation;
