import { View, Text } from "react-native";
import React from "react";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";

const AccountBlob = () => {
  return (
    <View className="p-4 flex-row space-x-4 items-center">
      <Avatar />

      <YStack>
        <Text className="text-[18px]">Criztian Jade</Text>
        <Text className="text-small text-gray-500/70">Milagros City</Text>
      </YStack>
    </View>
  );
};

export default AccountBlob;
