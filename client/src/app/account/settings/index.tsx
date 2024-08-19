import { Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Settings } from "lucide-react-native";
import useLogout from "@/feature/account/hooks/useLogout";
import { useAuth } from "@/providers/AuthProvider";
import useLocalStorage from "@/common/hooks/storage/useLocalStorage";
import YStack from "@/common/components/stacks/YStack";

const RootScreen = () => {
  const { clear } = useLocalStorage("auth");
  const { mutation } = useLogout();

  const handleLogout = () => mutation.mutate("");

  // const handleLogout = async () => {
  //   await clear();
  // };
  return (
    <>
      <SettingHeader />
      <ScreenBaseLayout>
        <YStack className="space-y-2">
          <Button variant="ghost" textClassName="text-black">
            FAQ
          </Button>
          <Button variant="ghost" textClassName="text-black">
            About
          </Button>
          <Button
            variant="ghost"
            textClassName="text-black"
            disabled={mutation.isPending}
          >
            Update Account
          </Button>
          <Button
            variant="ghost"
            textClassName="text-white"
            disabled={mutation.isPending}
            className="bg-red-600 text-white"
          >
            Delete Account
          </Button>
          <Button onPress={handleLogout} disabled={mutation.isPending}>
            Logout
          </Button>
        </YStack>
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

const SettingHeader = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerRight: () => (
            <XStack>
              <Button
                variant="ghost"
                size="icon"
                onPress={() => router.push("/account/settings")}
              >
                <Settings color="black" />
              </Button>
            </XStack>
          ),
        }}
      />
    </>
  );
};
