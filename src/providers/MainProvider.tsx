import React, { Suspense } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import NostrDataProvider from './NostrProvider';
import RouteProvider from './RouteProvider';
import StateProvider from './StateProvider';
import ThemeContextProvider from './ThemeProvider';

type Props = { children: JSX.Element };

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView style={styles.container}>
          <NostrDataProvider>
            <Suspense fallback={<ActivityIndicator size="large" />}>
              <RouteProvider>{children}</RouteProvider>
            </Suspense>
          </NostrDataProvider>
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </StateProvider>
  );
};

export default MainProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
