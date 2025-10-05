import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "../../app/providers/ThemeProvider";
import { SettingsScreen } from "../../pages/settings/ui/SettingsScreen";
import { ShiftDetailsScreen } from "../../pages/shift-details/ui/ShiftDetailsScreen";
import { ShiftsListScreen } from "../../pages/shifts-list/ui/ShiftsListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShiftsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.text.inverse,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="ShiftsList"
          component={ShiftsListScreen}
          options={{ title: "Доступные смены" }}
        />
        <Stack.Screen
          name="ShiftDetails"
          component={ShiftDetailsScreen}
          options={{ title: "Детали смены" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Настройки" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
