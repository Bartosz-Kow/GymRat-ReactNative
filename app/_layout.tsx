import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
