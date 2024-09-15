import { View, Text } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageSquare } from "lucide-react-native";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import ProfileDetails from "./ProfileDetails";
import { IAccount } from "../interface/account.interface";
import YStack from "@/common/components/stacks/YStack";
import useAcceptRequest from "@/feature/booking/hooks/useAcceptRequest";
import useBookingDone from "@/feature/booking/hooks/useBookingDone";

interface Props extends IAccount {
  status?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  requestId?: string;
  accountId?: string;
}

const BookingRequestDetails: FC<Props> = ({ _id, status, ...props }) => {
  return (
    <>
      <ProfileDetails {...props}>
        <XStack className="w-full space-x-4">
          <BookingButton
            targetID={props.requestId as string}
            status={status || ""}
          />

          <MessageButton targetID={props.accountId as string} />
        </XStack>

        <YStack className="w-full">
          <YStack className="p-4  items-center rounded-md">
            <Text className="text-base">Pickup Location</Text>
            <Text className="text-base"> - </Text>
            <View className="px-4 py-1 rounded-full border border-gray-400">
              <Text className="text-base">
                {props?.pickupLocation || "DEBESMSCAT"}
              </Text>
            </View>
          </YStack>

          <YStack className="p-4  items-center rounded-md">
            <Text className="text-base">Drop Off Location</Text>
            <Text className="text-base"> - </Text>

            <View className="px-4 py-1 rounded-full border border-gray-400">
              <Text className="text-base">
                {props.dropoffLocation || "DEBESMSCAT"}
              </Text>
            </View>
          </YStack>
        </YStack>
      </ProfileDetails>
    </>
  );
};

export default BookingRequestDetails;

interface ButtonProps {
  targetID: string;
  status?: string;
}

const MessageButton = ({ targetID }: ButtonProps) => {
  const { mutation } = useCreateConversation(targetID as string);
  return (
    <Button
      className="flex-1 ml-2"
      variant="outlined"
      onPress={() => mutation.mutate("")}
    >
      <View className="flex-1 flex-row justify-center items-center space-x-2">
        <MessageSquare color="black" />
        <Text className="text-base"> Message</Text>
      </View>
    </Button>
  );
};

const BookingButton = ({ targetID, status }: ButtonProps) => {
  const { mutation: acceptMutation } = useAcceptRequest(targetID as string);
  const { mutation: doneMutation } = useBookingDone(targetID as string);

  const handleAcceptMutation = () => {
    acceptMutation.mutate("");
  };
  const handleDoneMuatation = () => {
    doneMutation.mutate("");
  };
  return (
    <>
      <Button
        className="flex-1 mr-2"
        onPress={
          status === "accepted" ? handleDoneMuatation : handleAcceptMutation
        }
      >
        <Text>{status === "accepted" ? "Done" : "Accept"}</Text>
      </Button>
    </>
  );
};
