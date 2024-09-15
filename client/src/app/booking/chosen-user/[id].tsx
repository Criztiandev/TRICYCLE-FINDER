import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, borderWidth: 1 }}>
        <View className="bg-white p-4  pt-24" style={{ flex: 1 }}>
          <ProfileDetails {...data}>
            <View style={{ flex: 1, gap: 16 }}>
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
            </View>

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
                  <Text className="text-base">{data?.dropoffLocation}</Text>
                </XStack>
              </YStack>
            </View>
          </ProfileDetails>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    <Button onPress={() => mutation.mutate("")}>
      <Text>Message</Text>
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
    <Button onPress={() => mutation.mutate("")}>
      <Text>Accept</Text>
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
    <Button onPress={() => mutation.mutate("")}>
      <Text>Done</Text>
    </Button>
  );
};
