import { View, TouchableOpacity, Text } from "react-native";
import React, { useRef } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import { IAccount } from "@/feature/account/interface/account.interface";
import Button from "@/common/components/ui/Button";
import YStack from "@/common/components/stacks/YStack";
import { FormProvider } from "react-hook-form";
import SelectField from "@/common/components/form/SelectField";
import BottomSheet from "@/common/components/ui/BottomSheet";
import useRateRider from "@/feature/rider/hooks/useRiderRating";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const RootScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  console.log(id);

  return (
    <>
      <DetailsHeader />
      <View className="bg-white flex-1 p-4 justify-center items-center">
        <Text className="text-5xl font-bold  text-center">
          Thank you for using the Apps
        </Text>
        <YStack className="w-full  space-y-4 my-12">
          <RatingButton riderID={id as string} />
          <Button
            variant="outlined"
            onPress={() => router.replace("/")}
            textClassName="text-lgz"
          >
            Back
          </Button>
        </YStack>
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
        title: "Account Details",
        headerLeft: () => (
          <TouchableOpacity className="mr-4" onPress={() => router.back()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        ),
      }}
    />
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
        <View className="flex-row space-x-2 justify-center items-center">
          <Star fill="#f1c40f" size={32} />
          <Text className="text-white text-center text-lg ">
            Give us your Rating
          </Text>
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
