import React from "react";
import { Stack, Tabs } from "expo-router";
import { Home, Search, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="list/index" />
    </Stack>
  );
};

export default RootLayout;
