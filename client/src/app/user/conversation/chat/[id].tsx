import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import useConversation from "@/feature/conversation/hooks/useConversation";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useAuth } from "@/providers/AuthProvider";
import useSendMessage from "@/feature/conversation/hooks/useSendMessage";
import { ArrowLeft } from "lucide-react-native";

const RootScreen: React.FC = () => {
  const { id: initialRecipientID } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const { query: conversationQuery, messages } =
    useConversation(initialRecipientID);
  const { handleSendMessage } = useSendMessage(initialRecipientID);

  const { isLoading, isError, error, data } = conversationQuery;

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const recipient = data?.recipient || {
    _id: initialRecipientID,
    name: "Recipient",
  };

  return (
    <>
      <ConversationHeader recipientName={recipient.name} />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={handleSendMessage}
          user={{
            _id: user?.UID || "",
            name: user?.name || "",
          }}
          showAvatarForEveryMessage={true}
          renderAvatarOnTop={true}
        />
      </View>
    </>
  );
};

export default RootScreen;

const ConversationHeader: React.FC<{ recipientName: string }> = ({
  recipientName,
}) => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: recipientName,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
            <ArrowLeft color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};
