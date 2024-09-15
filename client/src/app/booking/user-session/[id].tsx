import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
import { useAuth } from "@/providers/AuthProvider";

interface Props extends IAccount {
  status?: string;
  bookingStatus?: string;
}

interface MessageButtonProps {
  riderID: string;
}

const SOCKET_URL = "http://192.168.1.2:4000";

const RootScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, isLoading, isError, error } = useRiderDetails(id as string);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("booking-done", (payload) => {
      const { bookingID, role } = payload;
      if (bookingID === data?._id && role === "user") {
        router.replace(`booking/rating/${id}` as Href<string>);
      }
    });
  }, [data]);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ProfileDetails {...data} />
          <View style={{ marginTop: 16, gap: 16 }}>
            <RatingButton riderID={id as string} />
            <MessageButton riderID={id as string} />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    <Button onPress={() => mutation.mutate("")}>
      <Text className="text-white text-center text-base "> Message</Text>
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
      <Button onPress={() => toggleRatingSheet()}>
        <Text className="text-white text-center text-base ">Rate</Text>
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
                <Text className="text-white text-center text-base ">Rate</Text>
              </Button>
            </YStack>
          </FormProvider>
        </View>
      </BottomSheet>
    </>
  );
};
