import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ShiftDetailsScreen } from '../../pages/shift-details/ui/ShiftDetailsScreen';
import { ShiftsListScreen } from '../../pages/shifts-list/ui/ShiftsListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShiftsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="ShiftsList"
          component={ShiftsListScreen}
          options={{ title: 'Доступные смены' }}
        />
        <Stack.Screen
          name="ShiftDetails"
          component={ShiftDetailsScreen}
          options={{ title: 'Детали смены' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
