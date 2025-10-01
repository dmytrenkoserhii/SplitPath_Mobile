import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export const AuthLoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff8809" />
      <Text style={styles.text}>Checking authentication...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1b1e',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#909296',
    textAlign: 'center',
  },
});
