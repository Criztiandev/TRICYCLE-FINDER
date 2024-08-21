import { View, Text } from "react-native";
import React, { FC, ReactNode } from "react";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import XStack from "@/common/components/stacks/XStack";
import { IAccount } from "../interface/account.interface";

interface Props extends IAccount {
  status?: string;
  children?: ReactNode;
}

const ProfileDetails: FC<Props> = ({
  _id,
  firstName,
  lastName,
  status,
  children,
  ...props
}) => {
  return (
    <View className="relative">
      <View className="h-[200px]  rounded-[5px]"></View>
      <YStack className="absolute top-8 left-0 right-0 bottom-0 flex items-center space-y-4">
        <Avatar size={150} />
        {/* Full Name */}
        <YStack className="justify-center justify-items-center">
          <Text className="text-2xl font-medium">
            {firstName} {lastName}
          </Text>
        </YStack>

        <YStack className="justify-center items-center space-y-2 mb-4">
          <Text className="text-base">Milagross, Masbate, Mandaon</Text>
          <Text className="text-base">09482004868</Text>
        </YStack>

        {children}
      </YStack>
    </View>
  );
};

export default ProfileDetails;
