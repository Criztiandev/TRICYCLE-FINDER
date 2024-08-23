import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { ArrowLeft, MessageSquare, Star } from "lucide-react-native";
import ProfileDetails from "@/feature/account/component/ProfileDetails";
import XStack from "@/common/components/stacks/XStack";
import { IAccount } from "@/feature/account/interface/account.interface";
import Button from "@/common/components/ui/Button";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FormProvider } from "react-hook-form";
import YStack from "@/common/components/stacks/YStack";
import InputField from "@/common/components/form/InputField";
import BottomSheet from "@/common/components/ui/BottomSheet";
import useBookingRequest from "@/feature/booking/hooks/useBookingRequest";
import useRiderDetails from "@/feature/rider/hooks/useRiderDetails";
import { io } from "socket.io-client";
import useRateRider from "@/feature/rider/hooks/useRiderRating";
import SelectField from "@/common/components/form/SelectField";

interface Props extends IAccount {
  status?: string;
  bookingStatus?: string;
}

interface MessageButtonProps {
  riderID: string;
}

const SOCKET_URL = "http://192.168.1.6:4000";

const RootScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useRiderDetails(id as string);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("booking-done", (acceptedID) => {
      if (acceptedID === data?._id) {
        router.replace(`booking/rating/${data?._id}` as Href<string>);
      }
    });
  }, [data]);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <DetailsHeader />
      <View className="bg-white flex-1 p-4 justify-center">
        <ProfileDetails {...data}>
          <XStack className="w-full space-x-4">
            <RatingButton riderID={id as string} />

            <MessageButton riderID={id as string} />
          </XStack>
        </ProfileDetails>
      </View>
    </>
  );
};

export default RootScreen;

/**
 *
 * @returns Header
 */
const DetailsHeader: React.FC = () => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: "Session",
      }}
    />
  );
};

/**
 *
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

/**
 *
 * @param param - Props that accept the rider id and the status of the booking
 * @returns
 */
const RatingButton = ({ riderID }: { riderID: string }) => {
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);
  const { form, mutation } = useRateRider(riderID);

  const toggleRatingSheet = () => {
    bottomSheetRef.current?.present();
  };

  const onRate = () => {
    mutation.mutate(form.getValues());
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <Button className="flex-1" onPress={() => toggleRatingSheet()}>
        <View className="flex-row space-x-2 justify-center items-center">
          <Star fill="#f1c40f" size={32} />
          <Text className="text-white text-center text-lg ">Rate</Text>
        </View>
      </Button>

      <BottomSheet ref={bottomSheetRef} snapPoints={["30%"]}>
        <View className="p-4">
          <FormProvider {...form}>
            <YStack className="space-y-4">
              <SelectField
                label="Rating"
                name="rating"
                options={[
                  { label: "Select Rating", value: "", disabled: true },
                  { label: "5 Star", value: 5 },
                  { label: "4 Star", value: 4 },
                  { label: "3 Star", value: 3 },
                  { label: "2 Star", value: 2 },
                  { label: "1 Star", value: 1 },
                ]}
              />

              <Button
                disabled={mutation.isPending}
                onPress={form.handleSubmit(onRate)}
              >
                Book
              </Button>
            </YStack>
          </FormProvider>
        </View>
      </BottomSheet>
    </>
  );
};
