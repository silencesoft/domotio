import { createStackNavigator } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React from 'react';

import User from 'src/components/user';
import FeedScreen from 'src/screens/Feed';
import LoginScreen from 'src/screens/Login';
import UploadVideoScreen from 'src/screens/UploadVideo';
import { pubKeyAtom } from 'src/state/user';
import TabsNavigator from '../TabsNavigator';

type Props = {};

const Stack = createStackNavigator();

const MainNavigator = (props: Props) => {
  const pubKey = useAtomValue(pubKeyAtom);

  return (
    <>
      <User pubkey={pubKey} />
      <Stack.Navigator>
        {!pubKey ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="UploadVideo"
              component={UploadVideoScreen}
              initialParams={{ source: '', sourceThumb: '' }}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="FeedItem" component={FeedScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
