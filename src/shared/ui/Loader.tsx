import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

