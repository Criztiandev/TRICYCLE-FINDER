import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { SquarePen } from "lucide-react-native";
import MessageCard from "@/feature/message/component/MessageCard";
import { FlashList } from "@shopify/flash-list";
import useConversationList from "@/feature/conversation/hooks/useConversationList";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import ConversationBlob from "@/feature/conversation/compnents/ConversationBlob";
import { Conversation } from "@/feature/conversation/interface/conversation.interface";

const RootScreen = () => {
  const { data: conversationList, isLoading, isError } = useConversationList();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <>
      <MessageHeader />
      <View className="flex-1">
        <FlashList
          data={conversationList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Conversation }) => {
            const participantDetails = item.participants as any;

            return (
              <ConversationBlob
                conversationID={item._id}
                {...participantDetails}
                updatedAt={item.updatedAt}
              />
            );
          }}
          estimatedItemSize={100}
        />
      </View>
    </>
  );
};

export default RootScreen;

const MessageHeader = () => {
  return (
    <Stack.Screen
      options={{
        title: "Messages",
        headerRight: () => (
          <XStack>
            <Button variant="ghost" size="icon">
              <SquarePen color="black" />
            </Button>
          </XStack>
        ),
      }}
    />
  );
};
