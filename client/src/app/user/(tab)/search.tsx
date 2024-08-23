import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import { View } from "react-native";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import useRiderList from "@/feature/rider/hooks/useRiderList";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@/common/components/ui/BottomSheet";
import useRiderDetails from "@/feature/rider/hooks/useRiderDetails";
import ProfileDetails from "@/feature/account/component/ProfileDetails";
import Toast from "react-native-toast-message";

const RootScreen = () => {
  const [selectedRider, setSelectedRider] = useState<Record<
    string,
    string
  > | null>(null);
  const router = useRouter();
  const { data, isLoading, isError, error } = useRiderList();
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const toggleRatingSheet = () => {
    bottomSheetRef.current?.present();
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  const handleRandomSearch = () => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomRider = data[randomIndex] as Record<string, string>;

      toggleRatingSheet();
      setSelectedRider(randomRider);
    }
  };

  const handleNavigate = () => {
    router.push(`/booking/chosen-rider/${selectedRider?._id}`);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout className="flex-1">
        <View className="flex justify-center items-center flex-1">
          <Button onPress={handleRandomSearch}>Search Rider</Button>
        </View>
      </ScreenBaseLayout>

      <BottomSheet ref={bottomSheetRef} snapPoints={["90%"]}>
        <View className="flex justify-center items-center flex-1">
          <RiderDetails
            onNavigate={handleNavigate}
            id={
              (selectedRider as unknown as Record<string, string>)
                ?._id as string
            }
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default RootScreen;

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
