import React from "react";
import { Stack, Tabs } from "expo-router";
import { Home, Search, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "#EA2027",
      },
      headerTintColor:"white"
    }}>
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="list/index" />
    </Stack>
  );
};

export default RootLayout;
