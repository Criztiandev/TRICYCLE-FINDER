import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import { IAccount } from "@/feature/account/interface/account.interface";
import Button from "@/common/components/ui/Button";
import YStack from "@/common/components/stacks/YStack";

const RootScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <>
      <DetailsHeader />
      <View className="bg-white flex-1 p-4 justify-center items-center">
        <Text className="text-5xl font-bold  text-center">
          Thank you for using the Apps
        </Text>
        <YStack className="w-full  space-y-4 my-12">
          <Button variant="outlined">
            <View className="flex-row space-x-2 justify-center items-center">
              <Star fill="#f1c40f" size={32} />
              <Text className="text-black text-center text-lg pr-8">
                Give us Rating
              </Text>
            </View>
          </Button>
          <Button onPress={() => router.replace("/")} textClassName="text-lg">
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
