import { View, Text } from "react-native";
import React, { FC, ReactNode } from "react";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import XStack from "@/common/components/stacks/XStack";
import { IAccount } from "../interface/account.interface";
import UserAvatar from "@/common/components/ui/UserAvatar";

interface Props extends IAccount {
  status?: string;
  children?: ReactNode;
}

const ProfileDetails: FC<Props> = ({
  _id,
  firstName,
  lastName,
  status,
  phoneNumber,
  address,
  children,
  ...props
}) => {
  return (
    <View className="relative">
      <View className="  rounded-[5px] justify-center items-center"></View>
      <YStack className="justify-center items-center space-y-4">
        {props.role === "user" ? (
          <UserAvatar
            size={150}
            source={require("@/assets/images/user-avatar.jpg")}
          />
        ) : (
          <Avatar
            size={150}
            source={require("@/assets/images/user-avatar.jpg")}
          />
        )}
        {/* Full Name */}
        <YStack className="justify-center justify-items-center">
          <Text className="text-2xl font-medium">
            {firstName} {lastName}
          </Text>
        </YStack>

        <YStack className="justify-center items-center space-y-2 mb-4">
          <Text className="text-base">
            {address || "Poblacion, Mandaon, Masbate"}
          </Text>
          <Text className="text-base">{phoneNumber}</Text>
        </YStack>

        {children}
      </YStack>
    </View>
  );
};

export default ProfileDetails;
