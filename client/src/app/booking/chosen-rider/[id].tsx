import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { ArrowLeft, MessageSquare } from "lucide-react-native";
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
import Toast from "react-native-toast-message";
import { useAuth } from "@/providers/AuthProvider";
import useLocalStorage from "@/common/hooks/storage/useLocalStorage";

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

const SOCKET_URL = "http://192.168.1.6:4000";

const RootScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, isLoading, isError, error } = useRiderDetails(id as string);

  /**
   * This effect lets you handle socket IO in realtime and get triggered when there is an update in the server
   */
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("booking-accepted", (payload) => {
      const { bookingID, role } = payload;
      if (bookingID === data?._id && role === "user") {
        router.navigate(`/booking/user-session/${id}` as Href<string>);
      }
    });
  }, [data, user]);

  /**
   * This effect handle the state of the status so It could redirect to the proper screen
   */
  useEffect(() => {
    if (data?.status === "accepted") {
      Toast.show({
        type: "info",
        text1: `Welcome back ${data?.firstName || "User"} ${
          data?.lastName || ""
        }`,
        text2: "Thank you for your patience",
      });
      router.navigate(`/booking/user-session/${id}`);
    }

    if (data?.status === "done") {
      Toast.show({
        type: "info",
        text1: "Booking is already done",
        text2: "Thank you for using the app",
      });
      router.navigate(`/`);
    }
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
            <BookingButton
              riderID={id as string}
              bookingID={data?._id as string}
              availability={data?.availability}
              status={data?.status}
            />

            <MessageButton riderID={id as string} />
          </XStack>
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

/**
 * This componnet is a button that lets you book to the rider that you selected
 * @param param - Props that accept the rider id and the status of the booking
 * @returns
 */
const BookingButton = ({
  riderID,
  availability,
  bookingID,
  status,
}: BookingButtonProps) => {
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);
  const { requestMutation, cancelMutation } = useBookingRequest();

  const { form, isPending, onRequest, isSuccess } = requestMutation(bookingID);
  const { onCancel } = cancelMutation(bookingID, riderID);

  const toggleBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      bottomSheetRef.current?.close();
    }
  }, [isSuccess]);

  const isDisabled = availability !== "available";
  const buttonText = getButtonText(
    availability || "unavailable",
    status || "N/A"
  );

  const handlePress = () => {
    if (buttonText === "Cancel Book") {
      onCancel();
    } else {
      toggleBottomSheet();
    }
  };

  return (
    <>
      <Button
        className="flex-1 mr-2"
        onPress={handlePress}
        disabled={isDisabled}
      >
        {buttonText}
      </Button>

      <BottomSheet ref={bottomSheetRef} snapPoints={["50%"]}>
        <View className="p-4">
          <FormProvider {...form}>
            <YStack className="space-y-4">
              <Text className="text-2xl font-bold text-center ">Transport</Text>
              <View>
                <InputField
                  label="Pickup Location"
                  name="pickupLocation"
                  placeholder="Enter your Pickup Location"
                />
              </View>
              <View>
                <InputField
                  label="Drop off Location"
                  name="dropoffLocation"
                  placeholder="Enter your Dropoff location"
                />
              </View>
              <Button
                disabled={isPending}
                onPress={form.handleSubmit(onRequest)}
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

const getButtonText = (availability: string, status: string): string => {
  if (availability === "available") {
    return status === "N/A"
      ? "Book"
      : status === "pending"
      ? "Cancel Book"
      : "Manage Booking";
  }
  return "Unavailable";
};
