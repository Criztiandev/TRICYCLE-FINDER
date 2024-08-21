import { View, Text } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageSquare } from "lucide-react-native";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import ProfileDetails from "./ProfileDetails";
import { IAccount } from "../interface/account.interface";

interface Props extends IAccount {
  status?: string;
}

const AccountDetails: FC<Props> = ({ _id, status, ...props }) => {
  const { mutation: conversationMutation } = useCreateConversation(
    _id as string
  );

  const handleMessage = () => {
    conversationMutation.mutate("");
  };

  return (
    <ProfileDetails {...props}>
      <XStack className="w-full space-x-4">
        <Button className="flex-1">Book</Button>

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
