import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Box, MessageCircle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import AccountBlob from "@/feature/account/component/AccountBlob";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { IAccount } from "@/feature/account/interface/account.interface";
import useRiderList from "@/feature/rider/hooks/useRiderList";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";
import { useEffect, useCallback } from "react";

const RootScreen = () => {
  const {
    data: riders,
    isLoading: ridersLoading,
    isError: ridersError,
  } = useRiderList();

  const router = useRouter();

  const handleRiderPress = useCallback(
    (riderId: string) => {
      router.navigate(`/booking/chosen-rider/${riderId}` as Href<string>);
    },
    [router]
  );

  if (ridersLoading) return <LoadingScreen />;
  if (ridersError) return <ErrorScreen />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
        <View className="flex-1 pb-24">
          {riders?.length > 0 ? (
            <FlashList
              data={riders?.reverse()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: IAccount }) => (
                <TouchableOpacity
                  onPress={() => handleRiderPress(item._id as string)}
                >
                  <AccountBlob {...item} />
                </TouchableOpacity>
              )}
              estimatedItemSize={100}
            />
          ) : (
            <View className="flex-1 justify-center items-center space-y-2">
              <Box color="black" size={64} />
              <Text className="text-2xl font-bold">
                There is no available rider
              </Text>
            </View>
          )}
        </View>
      </ScreenBaseLayout>
    </>
  );
};

const HomeScreenHeader = () => {
  const router = useRouter();

  const handleMessagePress = useCallback(() => {
    router.push("/user/conversation/list" as Href<string>);
  }, [router]);

  return (
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: "#179151",
        },
        headerRight: () => (
          <View
            style={{
              padding: 8,
            }}
          >
            <TouchableOpacity
              onPress={handleMessagePress}
              style={{
                borderRadius: 100,
              }}
            >
              <MessageCircle color="white" fill="white" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default RootScreen;
