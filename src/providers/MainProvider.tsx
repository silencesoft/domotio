import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

import RouteProvider from './RouteProvider';
import StateProvider from './StateProvider';
import { ThemeContextProvider } from './ThemeProvider';

type Props = { children: JSX.Element };

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <ThemeContextProvider>
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <RouteProvider>{children}</RouteProvider>
        </Suspense>
      </ThemeContextProvider>
    </StateProvider>
  );
};

export default MainProvider;
