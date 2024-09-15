import { Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Settings, Users } from "lucide-react-native";
import AccountDetails from "@/feature/account/component/AccountDetails";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import useProfile from "@/feature/account/hooks/useProfile";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import ProfileDetails from "@/feature/account/component/ProfileDetails";
import { Text, View } from "react-native";
import useLogout from "@/feature/account/hooks/useLogout";

const RootScreen = () => {
  const { data, isLoading, isError, error } = useProfile();
  const { mutation } = useLogout();

  const handleLogout = () => mutation.mutate("");

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;
  return (
    <>
      <AccountHeader />
      <ScreenBaseLayout>
        <View className="p-16">
          <ProfileDetails {...data} />

          <View style={{ padding: 16, gap: 16 }}>
            <Button onPress={handleLogout} disabled={mutation.isPending}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >   
                Logout
              </Text>
            </Button>
          </View>
        </View>
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

const AccountHeader = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <XStack></XStack>,
        }}
      />
    </>
  );
};
