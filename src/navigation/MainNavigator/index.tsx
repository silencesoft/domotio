import { createStackNavigator } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React from 'react';
import HomeScreen from 'src/screens/Home';

import LoginScreen from 'src/screens/Login';
import { pubKeyAtom } from 'src/state/user';


type Props = {};

const Stack = createStackNavigator();

const MainNavigator = (props: Props) => {
  const pubKey = useAtomValue(pubKeyAtom);
  console.log({ pubKey });

  return (
    <Stack.Navigator>
      {!pubKey ? (
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
