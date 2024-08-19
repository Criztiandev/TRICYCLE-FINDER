import React from "react";
import { Stack } from "expo-router";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="search/index" />
      <Stack.Screen name="settings/index" />
      <Stack.Screen name="friend-request/index" />
    </Stack>
  );
};

export default RootScreen;
