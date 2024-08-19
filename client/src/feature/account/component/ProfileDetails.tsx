import { View, Text } from "react-native";
import React, { FC, ReactNode } from "react";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import XStack from "@/common/components/stacks/XStack";
import { AccountDetails } from "../interface/account.interface";

interface Props extends AccountDetails {
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
      <View className="h-[200px] border rounded-[5px]"></View>
      <YStack className="absolute top-24 left-0 right-0 bottom-0 flex items-center space-y-4">
        <Avatar size={150} />
        {/* Full Name */}
        <YStack className="justify-center justify-items-center">
          <Text className="text-2xl font-medium">
            {firstName} {lastName}
          </Text>
        </YStack>

        {/* Details */}
        <XStack className="w-full px-4 justify-between items-center">
          <Text className="text-base text-center text-gray-600">Caloocan</Text>

          <Text className="text-base text-center text-gray-600">
            {props.followersCount || 0} Friends
          </Text>

          <Text className="text-base text-center text-gray-600">
            {props.gender || "Male"}
          </Text>
        </XStack>
        {/* Bio */}
        <View className="justify-center items-center">
          <Text className="text-base">
            {props?.bio || "Bio is not available"}
          </Text>
        </View>

        {children}

        {/* Attributes */}
        <XStack className="gap-2 flex flex-wrap">
          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>

          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>

          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>

          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>

          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>

          <View className="px-4 py-1 border border-gray-300 rounded-full">
            <Text>Male</Text>
          </View>
        </XStack>
      </YStack>
    </View>
  );
};

export default ProfileDetails;
