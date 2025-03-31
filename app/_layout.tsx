import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
