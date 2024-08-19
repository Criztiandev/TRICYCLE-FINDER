import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import useFriendList from "@/feature/friend/hooks/useFriendList";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { FlashList } from "@shopify/flash-list";
import FriendBlob from "@/feature/friend/component/FriendBlob";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import useFriendRequestSent from "@/feature/friend/hooks/useFriendRequestSent";
import FriendRequestBlob from "@/feature/friend/component/FriendRequestBlob";

interface ItemProps {
  _id: string;
  recipient: AccountDetails;
}

const RootScreen = () => {
  const { data, isLoading, isError, error } = useFriendRequestSent();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  return (
    <>
      <FriendHeader />
      <View className="bg-white flex-1 p-4">
        {/* Friend Requests */}

        <FlashList
          data={data}
          renderItem={({ item }: { item: ItemProps }) => (
            <FriendRequestBlob isSelf {...item.recipient} />
          )}
          estimatedItemSize={100}
        />
      </View>
    </>
  );
};

export default RootScreen;

const FriendHeader = () => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: "Sent Request",
      }}
    />
  );
};
