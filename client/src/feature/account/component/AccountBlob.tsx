import { View, Text } from "react-native";
import React from "react";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";
import { IAccount } from "../interface/account.interface";

const AccountBlob = (props: IAccount) => {
  return (
    <View className="p-4 flex-row space-x-4 items-center">
      <Avatar />

      <YStack>
        <Text className="text-[18px]">
          {props.firstName || "John"} {props.lastName || "Doe"}
        </Text>
        <Text className="text-small text-gray-500/70">
          {props.phoneNumber || "094994949"}
        </Text>
      </YStack>
    </View>
  );
};

export default AccountBlob;
