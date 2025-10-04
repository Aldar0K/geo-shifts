import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '../processes/navigation/AppNavigator';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};
