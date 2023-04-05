import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import FeedScreen from 'src/screens/Feed';
import ProfileScreen from 'src/screens/Profile';

type Props = {};

const { Screen, Navigator } = createMaterialTopTabNavigator();
const FeedNavigator = (props: Props) => {
  return (
    <Navigator initialRouteName="Feed" tabBar={() => <></>}>
      <Screen name="Feed" component={FeedScreen} />
      <Screen name="Profile" component={ProfileScreen} initialParams={{ embed: true }} />
    </Navigator>
  );
};

export default FeedNavigator;
