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
      <Stack.Screen name="rider-session/[id]" options={{ title: "Sessions" }} />
      <Stack.Screen name="user-session/[id]" options={{ title: "Sessions" }} />
      <Stack.Screen
        name="chosen-rider/[id]"
        options={{ title: "Ride Details" }}
      />

      <Stack.Screen
        name="chosen-user/[id]"
        options={{ title: "Ride Details" }}
      />
      <Stack.Screen name="rating/[id]" options={{ title: "Outro" }} />
    </Stack>
  );
};

export default RootScreen;
