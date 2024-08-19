import { View, Text } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import { AccountDetails } from "../interface/account.interface";
import Button from "@/common/components/ui/Button";
import { MessageSquare, UserMinus } from "lucide-react-native";
import { useRouter } from "expo-router";
import useRemoveFriend from "@/feature/friend/hooks/useRemoveFriend";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import ProfileDetails from "./ProfileDetails";

interface Props extends AccountDetails {
  status?: string;
}

const FriendDetails: FC<Props> = ({ _id, status, ...props }) => {
  const router = useRouter();
  const removeMutation = useRemoveFriend(_id as string);
  const { mutation: conversationMutation } = useCreateConversation(
    _id as string
  );

  const handleRemoveFriend = () => {
    removeMutation.mutate("");
  };

  const handleMessage = () => {
    conversationMutation.mutate("");
  };

  return (
    <ProfileDetails {...props}>
      <XStack className="w-full space-x-4">
        <Button className="flex-1" onPress={handleMessage}>
          <View className="flex-1 flex-row justify-center items-center space-x-2">
            <MessageSquare color="white" />
            <Text className="text-base text-white"> Message</Text>
          </View>
        </Button>

        <Button
          variant="outlined"
          className="flex-2"
          onPress={handleRemoveFriend}
        >
          <UserMinus color="black" />
        </Button>
      </XStack>
    </ProfileDetails>
  );
};

export default FriendDetails;
