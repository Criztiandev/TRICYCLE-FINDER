import { View, Text, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

interface Props extends TouchableOpacityProps {
  id?: string;
}

const MessageCard: FC<Props> = ({ onPress, ...props }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/user/message/conversation/${props.id}` as any);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <XStack className="justify-between items-start p-4">
        <XStack className="items-center space-x-4">
          <Avatar />
          <YStack>
            <Text className="font-medium">Criztian Jade</Text>
            <Text>haha nice</Text>
          </YStack>
        </XStack>
        <YStack>
          <Text>12:30</Text>
        </YStack>
      </XStack>
    </TouchableOpacity>
  );
};

export default MessageCard;
