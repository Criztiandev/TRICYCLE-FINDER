import React from "react";
import { Stack, Tabs } from "expo-router";
import { Home, Search, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="create/index" />
      <Stack.Screen name="update/[id]" />
      <Stack.Screen
        name="details/[id]"
        options={{
          title: "Post Details",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
