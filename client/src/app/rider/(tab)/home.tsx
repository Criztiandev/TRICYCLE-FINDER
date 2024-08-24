import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import useRiderRequestList from "@/feature/rider/hooks/useRiderRequestList";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import AccountBlob from "@/feature/account/component/AccountBlob";
import { TouchableOpacity } from "react-native";
import useBookingRequest from "@/feature/booking/hooks/useBookingRequest";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";
import { useEffect } from "react";

const RootScreen = () => {
  const router = useRouter();
  const { data: requestList, isLoading, isError } = useRiderRequestList();
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useBookingSession("rider");

  useEffect(() => {
    if (sessionData?.recipientID) {
      router.push(
        `/booking/chosen-user/${sessionData?.recipientID}` as Href<string>
      );
    }
  }, [sessionData]);

  if (isLoading || sessionLoading) return <LoadingScreen />;
  if (isError || sessionError) return <ErrorScreen />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
        <FlashList
          data={requestList?.reverse()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/booking/chosen-user/${item?.recipientID?._id}` as Href<string>
                )
              }
            >
              <AccountBlob {...item?.recipientID} />
            </TouchableOpacity>
          )}
          estimatedItemSize={100}
        />
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

/**
 * Home Tab Header
 * @purpose - to display the Title, Message and Create Post
 */

const HomeScreenHeader = () => {
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
