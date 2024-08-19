import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Href, Stack, useNavigation, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Input from "@/common/components/ui/Input";
import XStack from "@/common/components/stacks/XStack";
import FriendBlob from "@/feature/friend/component/FriendBlob";
import { FlashList } from "@shopify/flash-list";
import useFriendList from "@/feature/friend/hooks/useFriendList";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import InputField from "@/common/components/form/InputField";
import Button from "@/common/components/ui/Button";
import useSearchAccount from "@/feature/account/hooks/useSearchAccount";
import { useAuth } from "@/providers/AuthProvider";

const RootScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const { data: friendList, isLoading, isError, error } = useFriendList();
  const { searchedAccount, setSearchedAccount, mutation, form } =
    useSearchAccount();
  const router = useRouter();

  useEffect(() => {
    if (searchedAccount && searchedAccount.length > 0) {
      setSelectedData(searchedAccount);
    } else {
      setSelectedData(friendList?.followers);
    }
  }, [searchedAccount, friendList]);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }

  const handleSearch = () => {
    mutation.mutate("");
  };

  const handleNavigate = (id: string) => {
    console.log(id);
    if (user?.UID === id) {
      router.push("/user/(tab)/account" as Href<string>);
      return;
    }

    router.push(`/account/details/${id}` as Href<string>);
    form.reset();
    setSearchedAccount(null);
  };

  return (
    <>
      <SearchHeader />
      <View className="bg-white flex-1 p-4">
        <XStack>
          <FormProvider {...form}>
            <XStack className="flex-1 items-center justify-center space-x-3 mb-4">
              <View className="flex-1  justify-center items-center">
                <InputField
                  name="filter"
                  placeholder="Search here"
                  className="rounded-full px-3"
                />
              </View>

              <View className="flex-2  p-2">
                <TouchableOpacity
                  disabled={mutation.isPending}
                  onPress={handleSearch}
                >
                  <SearchIcon color="black" />
                </TouchableOpacity>
              </View>
            </XStack>
          </FormProvider>
        </XStack>

        <Text className="text-lg font-semibold mb-4">Recent Friends</Text>
        <FlashList
          data={selectedData}
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

const SearchHeader: React.FC = () => {
  return (
    <Stack.Screen
      options={{
        title: "Search",
      }}
    />
  );
};
