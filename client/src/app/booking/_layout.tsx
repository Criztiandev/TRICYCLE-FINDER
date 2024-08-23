import React from "react";
import { Stack } from "expo-router";

const RootScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="rider-session/[id]" options={{ title: "Sessions" }} />
      <Stack.Screen name="user-session/[id]" options={{ title: "Sessions" }} />
      <Stack.Screen
        name="chosen-rider/[id]"
        options={{ title: "Ride Details" }}
      />
    </Stack>
  );
};

export default RootScreen;
