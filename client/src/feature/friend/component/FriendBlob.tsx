import { View, Text } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";
import { AccountDetails } from "@/feature/account/interface/account.interface";

const FriendBlob: FC<AccountDetails> = ({ firstName, lastName }) => {
  return (
    <XStack className="space-x-2 items-center">
      <Avatar size={64} />
      <YStack>
        <Text className="text-base">
          {firstName || "John"} {lastName || "Doe"}
        </Text>
        <XStack className="space-x-2 `">
          <Text className="text-gray-500">Caloocan City</Text>
        </XStack>
      </YStack>
    </XStack>
  );
};

export default FriendBlob;
