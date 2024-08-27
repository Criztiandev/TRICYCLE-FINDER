import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Files, MessageCircle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Input from "@/common/components/ui/Input";
import AccountBlob from "@/feature/account/component/AccountBlob";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import useRiderRequestList from "@/feature/rider/hooks/useRiderRequestList";
import { useEffect } from "react";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";
import useRiderTransactionList from "@/feature/rider/hooks/useRiderTransactionList";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";

const RootScreen = () => {
  const { data, isLoading, isError, error } = useRiderTransactionList();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  console.log(data);
  return (
    <>
      <TransactionHeader />
      <ScreenBaseLayout>
        {data?.length > 0 ? (
          <FlashList
            data={data?.reverse()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => (
              <View className="w-full  px-4 py-4 pb-2">
                <View className="flex-1  rounded-md  ">
                  <View className="border border-gray-300">
                    {/* Profile */}
                    <XStack className=" p-4 space-x-4">
                      <Avatar />
                      <YStack>
                        <Text className="text-[18px]">
                          {item?.recipientID?.firstName || "John"}{" "}
                          {item?.recipientID?.lastName || "Doe"}
                        </Text>
                        <Text className="text-small text-gray-500/70">
                          {item?.recipientID?.phoneNumber || "094888282838"}
                        </Text>
                      </YStack>
                    </XStack>

                    {/* Details */}
                    <XStack className="p-4 flex-col space-y-4">
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <XStack>
              {/* Message Button */}
              <Button
                variant="ghost"
                size="icon"
                onPress={() =>
                  router.push("/rider/conversation/list" as Href<string>)
                }
              >
                <MessageCircle color="black" />
              </Button>
            </XStack>
          ),
        }}
      />
    </>
  );
};
