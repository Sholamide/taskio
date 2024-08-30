import { Stack } from "expo-router";

export const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task-details" options={{ headerShown: false }} />
    </Stack>
  );
};
