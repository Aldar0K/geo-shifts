import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "../processes/navigation/AppNavigator";
import { ThemeProvider } from "./providers/ThemeProvider";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
