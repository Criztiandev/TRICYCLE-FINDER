import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Bike, MessageCircle, Search } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import useRiderList from "@/feature/rider/hooks/useRiderList";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@/common/components/ui/BottomSheet";
import useRiderDetails from "@/feature/rider/hooks/useRiderDetails";
import ProfileDetails from "@/feature/account/component/ProfileDetails";
import Toast from "react-native-toast-message";
import useBookingSession from "@/feature/booking/hooks/useBookingSession";

const RootScreen = () => {
  const router = useRouter();
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useBookingSession("user");

  useEffect(() => {
    if (sessionData?.riderID) {
      router.push(`/booking/user-session/${sessionData.riderID}`);
    }
  }, [sessionData, router]);

  if (sessionLoading) return <LoadingScreen />;
  if (sessionError) return <ErrorScreen />;
  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout className="flex-1">
        <View className="flex justify-center items-center flex-1">
          <Bike size={64} color="black" />
          <Text className="text-2xl font-bold my-4">
            There is no Available Session
          </Text>
        </View>
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

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
const RiderDetails = ({
  id,
  onNavigate,
}: {
  id: string;
  onNavigate: () => void;
}) => {
  const { data, isLoading, isError, error } = useRiderDetails(id as string);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  return (
    <ProfileDetails {...data}>
      <Button onPress={onNavigate} className="w-full">
        Select Rider
      </Button>
    </ProfileDetails>
  );
};
