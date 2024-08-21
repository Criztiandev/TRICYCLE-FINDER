import { View, Text } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageSquare } from "lucide-react-native";
import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
import ProfileDetails from "./ProfileDetails";
import { IAccount } from "../interface/account.interface";
import useRequestBooking from "@/feature/booking/hooks/useRequestBooking";
import BottomSheet from "@/common/components/ui/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FormProvider } from "react-hook-form";
import InputField from "@/common/components/form/InputField";
import YStack from "@/common/components/stacks/YStack";
import { IBooking } from "@/feature/booking/interface/booking.interface";
import useCancelRequest from "@/feature/booking/hooks/useCancelRequest";

interface Props extends IAccount {
  status?: string;
  bookingStatus?: string;
}

const AccountDetails: FC<Props> = ({ _id, status, ...props }) => {
  return (
    <>
      <ProfileDetails {...props}>
        <XStack className="w-full space-x-4">
          <BookingButton
            targetID={_id as string}
            status={props.bookingStatus}
          />

          <MessageButton targetID={_id as string} />
        </XStack>
      </ProfileDetails>
    </>
  );
};

export default AccountDetails;

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
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  // Request Mutation
  const { mutation: requestMutation, form: bookingRequestForm } =
    useRequestBooking(targetID as string);

  const { mutation: cancelMutation } = useCancelRequest(targetID as string);

  const onRequestSubmit = (
    value: Pick<IBooking, "dropoffLocation" | "pickupLocation">
  ) => {
    requestMutation.mutate(value);
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const cancelRequest = () => {
    cancelMutation.mutate("");
  };

  useEffect(() => {
    if (requestMutation.isSuccess) {
      bottomSheetRef.current?.close();
    }
  }, [requestMutation.isSuccess]);
  return (
    <>
      <Button
        className="flex-1 mr-2"
        onPress={status === "pending" ? cancelRequest : openBottomSheet}
      >
        {status === "pending" ? "Cancel Book" : "Book"}
      </Button>

      <BottomSheet ref={bottomSheetRef} snapPoints={["50%"]}>
        <View className="p-4">
          <FormProvider {...bookingRequestForm}>
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
                disabled={requestMutation.isPending}
                onPress={bookingRequestForm.handleSubmit(onRequestSubmit)}
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
