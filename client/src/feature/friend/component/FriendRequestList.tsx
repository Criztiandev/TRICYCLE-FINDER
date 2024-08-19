import React from "react";
import { useRouter } from "expo-router";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { FlashList } from "@shopify/flash-list";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import useFriendRequest from "../hooks/useFriendRequest";
import FriendRequestBlob from "./FriendRequestBlob";
import { View } from "lucide-react-native";
import { FlatList } from "react-native";

interface ItemProps {
  _id: string;
  sender: AccountDetails;
}

const FriendRequestList = () => {
  const { data, isLoading, isError, error } = useFriendRequest();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  if (data?.length <= 0) return null;

  return (
    <>
      <View className="min-h-[100px]">
        <FlatList
          data={data}
          renderItem={({ item }) => <FriendRequestBlob {...item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
};

export default FriendRequestList;
