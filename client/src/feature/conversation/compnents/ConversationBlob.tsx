import { View, Text, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { AccountDetails } from "@/feature/account/interface/account.interface";

interface Props extends AccountDetails {
  conversationID?: string;
  onPress?: () => void;
  lastMessageSent?: string;
  updatedAt?: Date;
}

const ConversationBlob: FC<Props> = ({
  conversationID,
  onPress,
  lastMessageSent,
  ...props
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/user/conversation/chat/${conversationID}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <XStack className="justify-between items-start p-4">
        <XStack className="items-center space-x-4">
          <Avatar />
          <YStack>
            <Text className="font-medium">
              {props?.firstName || "John"} {props?.lastName || "doe"}
            </Text>
          </YStack>
        </XStack>
        <YStack></YStack>
      </XStack>
    </TouchableOpacity>
  );
};

export default ConversationBlob;
