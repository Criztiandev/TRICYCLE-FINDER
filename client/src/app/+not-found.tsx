import { Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  console.log("Not Founnd");
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text>Not Found</Text>
    </>
  );
}
