import React from "react";
import { Stack } from "expo-router";

const RootScreen = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#179151",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="details/[id]"
        options={{ title: "Account Details" }}
      />
      <Stack.Screen name="settings/index" />
    </Stack>
  );
};

export default RootScreen;
