import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import XStack from "@/common/components/stacks/XStack";
import { AccountDetails as AccountDetailsProps } from "../interface/account.interface";
import Button from "@/common/components/ui/Button";
import { MessageSquare } from "lucide-react-native";
import { useRouter } from "expo-router";
import useAddFriend from "@/feature/friend/hooks/useAddFriend";
import useCancelFriendRequest from "@/feature/friend/hooks/useCancelFriendRequest";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import ProfileDetails from "./ProfileDetails";

interface Props extends AccountDetailsProps {
  status?: string;
}

const AccountDetails: FC<Props> = ({ _id, status, ...props }) => {
  const addMutation = useAddFriend(_id as string);
  const removeMutation = useCancelFriendRequest(
    _id as string,
    `account-details-${_id}`
  );

  const { mutation: conversationMutation } = useCreateConversation(
    _id as string
  );

  const handleAddFriend = () => {
    addMutation.mutate("");
  };

  const handleCancelFriendRequest = () => removeMutation.mutate("");

  const handleMessage = () => {
    conversationMutation.mutate("");
  };

  return (
    <ProfileDetails {...props}>
      <XStack className="w-full space-x-4">
        <Button
          className="flex-1"
          onPress={
            status === "pending" ? handleCancelFriendRequest : handleAddFriend
          }
        >
          {getStatus(status as string)}
        </Button>

        <Button className="flex-1" variant="outlined" onPress={handleMessage}>
          <View className="flex-1 flex-row justify-center items-center space-x-2">
            <MessageSquare color="black" />
            <Text className="text-base"> Message</Text>
          </View>
        </Button>
      </XStack>
    </ProfileDetails>
  );
};

export default AccountDetails;

const getStatus = (status: string) => {
  if (status === "pending") return "Cancel Request";
  if (status === "friend") return "Unfriend";
  return "Add Friend";
};
