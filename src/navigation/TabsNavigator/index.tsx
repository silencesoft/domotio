import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useAtomValue } from 'jotai';
import React from 'react';

import FeedScreen from 'src/screens/Feed';
import HomeScreen from 'src/screens/Home';
import ProfileScreen from 'src/screens/Profile';
import RecordScreen from 'src/screens/Record';
import { pubKeyAtom } from 'src/state/user';

type Props = {};

const Tab = createMaterialBottomTabNavigator();

const TabsNavigator = (props: Props) => {
  const pubKey = useAtomValue(pubKeyAtom);

  return (
    <Tab.Navigator barStyle={{ backgroundColor: 'black' }} initialRouteName="feed" shifting={false}>
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="plus-square" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="message-square" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
        initialParams={{ initialUserId: pubKey }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;