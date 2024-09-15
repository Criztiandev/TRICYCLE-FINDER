import { Href, router, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Files, MessageCircle, Star } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Input from "@/common/components/ui/Input";
import AccountBlob from "@/feature/account/component/AccountBlob";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import useRiderRequestList from "@/feature/rider/hooks/useRiderRequestList";
import { useCallback, useEffect } from "react";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";
import useRiderTransactionList from "@/feature/rider/hooks/useRiderTransactionList";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";
import useUserTransactionList from "@/feature/rider/hooks/useUserTransactionList";

const RootScreen = () => {
  const { data, isLoading, isError, error } = useUserTransactionList();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <>
      <TransactionHeader />
      <ScreenBaseLayout>
        {data?.length > 0 ? (
          <FlashList
            data={data?.reverse()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push(`/rider/details/${item?.riderID?._id}`)
                }
              >
                <View className="w-full  px-4 py-4 pb-2">
                  <View className="flex-1  rounded-md  ">
                    <View className="border border-gray-300">
                      {/* Profile */}
                      <XStack className=" p-4 space-x-4">
                        <XStack className="justify-between items-center w-full">
                          <XStack>
                            <Avatar />
                            <YStack>
                              <Text className="text-[18px]">
                                {item?.riderID?.firstName || "John"}{" "}
                                {item?.riderID?.lastName || "Doe"}
                              </Text>
                              <Text className="text-small text-gray-500/70">
                                {item?.riderID?.phoneNumber || "094888282838"}
                              </Text>
                            </YStack>
                          </XStack>

                          <XStack>
                            <Star color="#f1c40f" />
                            <Text>5</Text>
                          </XStack>
                        </XStack>
                      </XStack>

                      {/* Details */}
                      <XStack className="flex-col p-4 space-y-4">
                        <View className="flex flex-row space-x-2 border border-gray-400 rounded-full px-4 py-1 flex-shrink-1">
                          <Text className="text-base">Pick up:</Text>
                          <Text className="text-base">
                            {item?.pickupLocation}
                          </Text>
                        </View>

                        <View className="flex flex-row space-x-2 border border-gray-400 rounded-full px-4 py-1 flex-shrink-1">
                          <Text className="text-base">Drop off:</Text>
                          <Text className="text-base">
                            {item?.dropoffLocation}
                          </Text>
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={100}
          />
        ) : (
          <View className="flex-1 justify-center items-center space-y-2">
            <Files color="black" size={64} />
            <Text className="text-2xl font-bold">
              The is no Transactions yet
            </Text>
          </View>
        )}
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

/**
 * Home Tab Header
 * @purpose - to display the Title, Message and Create Post
 */

const TransactionHeader = () => {
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
