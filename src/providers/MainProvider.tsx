import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { Suspense } from 'react';

import RouteProvider from './RouteProvider';
import StateProvider from './StateProvider';

type Props = { children: JSX.Element };

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <RouteProvider>{children}</RouteProvider>
      </Suspense>
    </StateProvider>
  );
};

export default MainProvider;
