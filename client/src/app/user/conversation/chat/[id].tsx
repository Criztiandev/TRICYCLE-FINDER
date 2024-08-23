import { Linking, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import useConversation from "@/feature/conversation/hooks/useConversation";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useAuth } from "@/providers/AuthProvider";
import useSendMessage from "@/feature/conversation/hooks/useSendMessage";
import { ArrowLeft, PhoneCall } from "lucide-react-native";
import Button from "@/common/components/ui/Button";

const RootScreen: React.FC = () => {
  const { id: UID } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const { query: conversationQuery, messages } = useConversation(UID);
  const { handleSendMessage } = useSendMessage(UID);

  const { isLoading, isError, error, data } = conversationQuery;

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const recipient = data?.recipient || {
    _id: UID,
    name: "Recipient",
    phoneNumber: data?.recipient.phoneNumber,
  };

  console.log(JSON.stringify(data, null, 2));

  return (
    <>
      <ConversationHeader
        recipientNumber={recipient.phoneNumber || "09488283838"}
        recipientName={recipient.name}
      />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={handleSendMessage}
          user={{
            _id: user?.UID || "",
            name: (user as unknown as Record<string, string>)?.name || "",
          }}
          showAvatarForEveryMessage={true}
          renderAvatarOnTop={true}
        />
      </View>
    </>
  );
};

export default RootScreen;

const ConversationHeader: React.FC<{
  recipientName: string;
  recipientNumber: string;
}> = ({ recipientName, recipientNumber }) => {
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

        headerRight: () => (
          <Button
            variant="ghost"
            onPress={() =>
              Linking.openURL(`tel:${recipientNumber || "094828828383"} `)
            }
          >
            <PhoneCall color="black" />
          </Button>
        ),
      }}
    />
  );
};
