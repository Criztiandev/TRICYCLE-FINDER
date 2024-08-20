import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import ProtectedRoute from "@/common/components/routes/ProtectedRoute";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const RootLayout = () => {
  return (
    <ProtectedRoute>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="conversation" />
        </Stack>
      </BottomSheetModalProvider>
    </ProtectedRoute>
  );
};

export default RootLayout;
