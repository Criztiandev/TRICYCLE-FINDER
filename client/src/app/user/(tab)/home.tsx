import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import Input from "@/common/components/ui/Input";
import AccountBlob from "@/feature/account/component/AccountBlob";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { IAccount } from "@/feature/account/interface/account.interface";
import useRiderList from "@/feature/rider/hooks/useRiderList";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";
import { useEffect } from "react";

const RootScreen = () => {
  const { data, isLoading, isError, error } = useRiderList();
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useBookingSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData?.riderID) {
      router.replace(`/booking/user-session/${sessionData?.riderID}`);
    }
  }, [sessionData]);

  if (isLoading || sessionLoading) return <LoadingScreen />;
  if (isError || sessionError) return <ErrorScreen />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
        <TouchableOpacity className="w-full px-4">
          <Input
            placeholder="Whats is in your mind ?"
            className="rounded-full px-3"
            disabled
          />
        </TouchableOpacity>
        <FlashList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: IAccount }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate(
                  `/booking/chosen-rider/${item._id}` as Href<string>
                )
              }
            >
              <AccountBlob {...item} />
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
                  router.push("/user/conversation/list" as Href<string>)
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
