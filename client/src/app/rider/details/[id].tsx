import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useAccountDetails from "@/feature/account/hooks/useAccountDetails";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowLeft } from "lucide-react-native";
import AccountDetails from "@/feature/account/component/AccountDetails";
import useViewAccountDetails from "@/feature/account/hooks/useViewAccountDetails";
import AccountWithNoBook from "@/feature/account/component/AccountWithNoBook";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useViewAccountDetails(
    id as string
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <DetailsHeader />
      <View className="bg-white flex-1 p-4">
        <AccountWithNoBook {...data} />
      </View>
    </>
  );
};

export default RootScreen;
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
