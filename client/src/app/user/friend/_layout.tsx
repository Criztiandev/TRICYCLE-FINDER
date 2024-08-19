import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="list/index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
};

export default _layout;
