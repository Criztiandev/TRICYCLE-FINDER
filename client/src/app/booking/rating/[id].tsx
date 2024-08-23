import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { IAccount } from "@/feature/account/interface/account.interface";

const RootScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <>
      <DetailsHeader />
      <View className="bg-white flex-1 p-4 justify-center"></View>
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
