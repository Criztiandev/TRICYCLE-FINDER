import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle, Search } from "lucide-react-native";
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
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 72,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              paddingVertical: 32,
              color: "white",
            }}
          >
            Search Rider
          </Text>
          <View
            style={{
              width: 350,
              height: 350,
              borderWidth: 18,
              borderColor: "#179151",
              backgroundColor: "#95d9a5",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
            }}
          >
            <Image
              source={require("@/assets/images/Hero-logo.png")}
              style={{
                width: 250,
                height: 250,
                marginTop: 32,
              }}
            />
          </View>
          <LinearGradient
            colors={["#0097b2", "#7ed957"]} // Define gradient colors here
            style={{
              position: "absolute",

              width: 600,
              height: 600,
              borderRadius: 999,
              zIndex: -5,
            }}
            start={{ x: 0, y: 0 }} // Start point for the gradient (top-left)
            end={{ x: 1, y: 1 }} // End point for the gradient (bottom-right)
          />
        </View>

        <View style={{ marginVertical: 16, paddingHorizontal: 32 }}>
          <Button onPress={handleRandomSearch}>
            <Text style={{ fontSize: 18, color: "white" }}>Search Rider</Text>
          </Button>
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
        <Text style={{ fontSize: 18, color: "white" }}>Select Rider</Text>
      </Button>
    </ProfileDetails>
  );
};
