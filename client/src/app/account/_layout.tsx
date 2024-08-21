import React from "react";
import { Stack } from "expo-router";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen
        name="details/[id]"
        options={{ title: "Account Details" }}
      />
      <Stack.Screen name="settings/index" />
    </Stack>
  );
};

export default RootScreen;
