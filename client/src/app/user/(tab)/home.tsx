import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
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
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useBookingSession("user");
  const router = useRouter();

  useEffect(() => {
    if (sessionData?.riderID) {
      router.push(`/booking/user-session/${sessionData.riderID}`);
    }
  }, [sessionData, router]);

  const handleRiderPress = useCallback(
    (riderId: string) => {
      router.navigate(`/booking/chosen-rider/${riderId}` as Href<string>);
    },
    [router]
  );

  if (ridersLoading || sessionLoading) return <LoadingScreen />;
  if (ridersError || sessionError) return <ErrorScreen />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
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
        headerRight: () => (
          <XStack>
            <Button variant="ghost" size="icon" onPress={handleMessagePress}>
              <MessageCircle color="black" />
            </Button>
          </XStack>
        ),
      }}
    />
  );
};

export default RootScreen;
