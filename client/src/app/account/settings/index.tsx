import { Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { Settings } from "lucide-react-native";
import useLogout from "@/feature/account/hooks/useLogout";
import { useAuth } from "@/providers/AuthProvider";
import useLocalStorage from "@/common/hooks/storage/useLocalStorage";
import YStack from "@/common/components/stacks/YStack";
import { Text, TouchableOpacity, View } from "react-native";

const RootScreen = () => {
  const { clear } = useLocalStorage("auth");
  const { mutation } = useLogout();

  const handleLogout = () => mutation.mutate("");

  // const handleLogout = async () => {
  //   await clear();
  // };
  return (
    <>
      <ScreenBaseLayout></ScreenBaseLayout>
    </>
  );
};

export default RootScreen;
