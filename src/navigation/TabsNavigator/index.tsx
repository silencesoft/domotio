import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useAtomValue } from 'jotai';
import React from 'react';

import ProfileScreen from 'src/screens/Profile';
import RecordScreen from 'src/screens/Record';
import { pubKeyAtom } from 'src/state/user';
import FeedNavigator from '../FeedNavigator';

type Props = {};

const Tab = createMaterialBottomTabNavigator();

const TabsNavigator = (props: Props) => {
  const pubKey = useAtomValue(pubKeyAtom);

  return (
    <Tab.Navigator barStyle={{ backgroundColor: 'black' }} initialRouteName="Feed" shifting={false}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Discover"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="Add"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="plus-square" size={24} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Inbox"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="message-square" size={24} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
        initialParams={{ embed: false }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
