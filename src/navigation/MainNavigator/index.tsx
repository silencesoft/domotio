import { createStackNavigator } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React from 'react';

import LoginScreen from 'src/screens/Login';
import { pubKeyAtom } from 'src/state/user';
import TabsNavigator from '../TabsNavigator';

type Props = {};

const Stack = createStackNavigator();

const MainNavigator = (props: Props) => {
  const pubKey = useAtomValue(pubKeyAtom);

  return (
    <Stack.Navigator>
      {!pubKey ? (
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="home" component={TabsNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
