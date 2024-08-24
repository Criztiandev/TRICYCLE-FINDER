import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { ArrowLeft, MessageSquare } from "lucide-react-native";
import ProfileDetails from "@/feature/account/component/ProfileDetails";
import XStack from "@/common/components/stacks/XStack";
import { IAccount } from "@/feature/account/interface/account.interface";
import Button from "@/common/components/ui/Button";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import YStack from "@/common/components/stacks/YStack";
import useUserBookingDetails from "@/feature/booking/hooks/useBookingUserDetails";
import useAcceptRequest from "@/feature/booking/hooks/useAcceptRequest";
import useBookingDone from "@/feature/booking/hooks/useBookingDone";

interface Props extends IAccount {
  status?: string;
  bookingStatus?: string;
}

interface BookingButtonProps {
  riderID: string;
  bookingID: string;
  status?: string;
  availability?: string;
}

interface MessageButtonProps {
  riderID: string;
}

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useUserBookingDetails(
    id as string
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <View className="bg-white flex-1 p-4  pt-24">
        <ProfileDetails {...data}>
          <XStack className="w-full space-x-4">
            {data?.status === "pending" ? (
              <AcceptButton
                userID={id as string}
                bookingRequestID={data?._id as string}
              />
            ) : (
              <DoneButton
                userID={id as string}
                bookingRequestID={data?._id as string}
              />
            )}
            <MessageButton riderID={id as string} />
          </XStack>

          <View className="w-full ">
            <Text className="text-base text-gray-400 font-semibold">
              Details
            </Text>

            <YStack className="my-4">
              <XStack className="w-full justify-between items-center">
                <Text className="text-base">Pick-up Location:</Text>
                <Text className="text-base">{data?.pickupLocation}</Text>
              </XStack>

              <View className="border w-full border-gray-200 my-3"></View>

              <XStack className="w-full justify-between items-center">
                <Text className="text-base">Dropoff Location:</Text>
                <Text className="text-base">{data?.pickupLocation}</Text>
              </XStack>
            </YStack>
          </View>
        </ProfileDetails>
      </View>
    </>
  );
};

export default RootScreen;

/**
 * This component lets you customize the header section of the screen
 * @returns Header
 */
const DetailsHeader: React.FC = () => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: "Account Details",
        headerLeft: () => (
          <TouchableOpacity className="mr-4" onPress={() => router.push("/")}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};

/**
 * This components lets you hanle Message button that lets you message the rider with your account
 * @param param - Props that you want ti send a message
 * @returns
 */
const MessageButton = ({ riderID }: MessageButtonProps) => {
  const { mutation } = useCreateConversation(riderID as string);
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

const AcceptButton = ({
  userID,
  bookingRequestID,
}: {
  userID: string;
  bookingRequestID: string;
}) => {
  const { mutation } = useAcceptRequest(userID, bookingRequestID);

  return (
    <Button className="flex-1" onPress={() => mutation.mutate("")}>
      Accept
    </Button>
  );
};

const DoneButton = ({
  userID,
  bookingRequestID,
}: {
  userID: string;
  bookingRequestID: string;
}) => {
  const { mutation } = useBookingDone(userID, bookingRequestID);

  return (
    <Button className="flex-1" onPress={() => mutation.mutate("")}>
      Done
    </Button>
  );
};
