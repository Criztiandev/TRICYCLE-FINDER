import { View, Text } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageSquare, Star } from "lucide-react-native";
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
import SelectField from "@/common/components/form/SelectField";
import useRateRider from "@/feature/rider/hooks/useRiderRating";

interface Props extends IAccount {
  status?: string;
  bookingStatus?: string;
}

const AccountDetails: FC<Props> = ({ _id, status, ...props }) => {
  return (
    <>
      <ProfileDetails {...props}>
        <XStack className="w-full space-x-4  h-[52px]">
          <RatingButton riderID={_id as string} />
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
      onPress={() => mutation.mutate("")}
      variant="outlined"
    >
      <View className="flex-1 flex-row justify-center items-center space-x-2">
        <Text className="text-base text-black"> Message</Text>
      </View>
    </Button>
  );
};

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
      <Button onPress={() => toggleRatingSheet()} className="flex-1">
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
                Rate
              </Button>
            </YStack>
          </FormProvider>
        </View>
      </BottomSheet>
    </>
  );
};
