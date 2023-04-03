import React from 'react';
import { StyleSheet } from 'react-native';

import MainProvider from 'src/providers/MainProvider';
import LoginScreen from 'src/screens/Login';

export default function App() {
  return (
    <MainProvider>
      <LoginScreen />
    </MainProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
