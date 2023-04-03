import React from 'react';

import StateProvider from './StateProvider';

type Props = { children: JSX.Element };

const MainProvider = ({ children }: Props) => {
  return <StateProvider>{children}</StateProvider>;
};

export default MainProvider;
