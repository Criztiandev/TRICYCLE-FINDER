import { View, Text } from "react-native";
import React from "react";
import { Href, Stack, useRouter } from "expo-router";
import useFriendList from "@/feature/friend/hooks/useFriendList";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { FlashList } from "@shopify/flash-list";
import FriendBlob from "@/feature/friend/component/FriendBlob";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import FriendRequestList from "@/feature/friend/component/FriendRequestList";
import { UserCog } from "lucide-react-native";
import { useAuth } from "@/providers/AuthProvider";

interface ItemProps {
  _id: string;
  followers: AccountDetails;
}

const RootScreen = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useFriendList();
  const router = useRouter();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  const handleNavigate = (id: string) => {
    if (id === user?.UID) {
      router.navigate(`/user/(tab)/account`);
      return;
    }

    router.push(`/account/details/${id}` as Href<string>);
  };

  return (
    <>
      <FriendHeader />
      <View className="bg-white flex-1 p-4">
        {/* Friend Requests */}
        <FriendRequestList />

        <FlashList
          data={data?.followers}
          renderItem={({ item }: { item: AccountDetails }) => (
            <TouchableOpacity
              onPress={() => handleNavigate(item._id?.toString() || "")}
              className="mb-4"
            >
              <FriendBlob {...item} />
            </TouchableOpacity>
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
        title: "Friend",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.navigate("/account/friend-request")}
          >
            <UserCog color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};
