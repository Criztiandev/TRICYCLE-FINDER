import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useRef } from "react";
import XStack from "@/common/components/stacks/XStack";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import Button from "@/common/components/ui/Button";
import { Check, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import useAcceptFriendRequest from "../hooks/useAcceptFriendRequest";
import useCancelFriendRequest from "../hooks/useCancelFriendRequest";

interface Props extends AccountDetails {
  requestID?: string;
  isSelf?: boolean;
}

const FriendRequestBlob: FC<Props> = ({
  requestID,
  _id,
  firstName,
  lastName,
  ...props
}) => {
  const acceptRequest = useAcceptFriendRequest(requestID, "friend-requests");
  const rejectRequest = useCancelFriendRequest(
    _id as string,
    "friend-requests"
  );
  const router = useRouter();
  const bodyRef = useRef<TouchableOpacity>(null);
  const acceptRef = useRef<View>(null);
  const rejectRef = useRef<View>(null);

  const handleBodyPress = () => {
    router.push(`/user/friend/details/${_id}`);
  };

  const handleAccept = () => {
    acceptRequest.mutate("");
  };

  const handleReject = () => {
    rejectRequest.mutate("");
  };

  return (
    <TouchableOpacity
      ref={bodyRef}
      onPress={handleBodyPress}
      activeOpacity={1} // Ensure it doesn't visually respond to the press
      style={{ flex: 1 }}
    >
      <XStack className="space-x-2 items-center justify-between">
        <XStack className="items-center space-x-2">
          <Avatar size={64} />
          <YStack>
            <Text className="text-base">
              {firstName || "John"} {lastName || "Doe"}
            </Text>
            <XStack className="space-x-2">
              <Text className="text-gray-500">Caloocan City</Text>
            </XStack>
          </YStack>
        </XStack>

        <XStack className="space-x-2">
          {!props.isSelf && (
            <View ref={acceptRef}>
              <Button onPress={handleAccept}>
                <Check color="white" />
              </Button>
            </View>
          )}

          <View ref={rejectRef}>
            <Button variant="outlined" onPress={handleReject}>
              <X color="black" />
            </Button>
          </View>
        </XStack>
      </XStack>
    </TouchableOpacity>
  );
};

export default FriendRequestBlob;
