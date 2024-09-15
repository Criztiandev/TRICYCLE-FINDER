import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="conversation" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
};

export default RootLayout;
