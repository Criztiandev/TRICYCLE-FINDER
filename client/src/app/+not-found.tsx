import { Stack } from "expo-router";

export default function NotFoundScreen() {
  console.log("Not Founnd");
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
    </>
  );
}
