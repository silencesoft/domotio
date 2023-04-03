import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

type Props = { children: JSX.Element };

const RouteProvider = ({ children }: Props) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default RouteProvider;
