import React from 'react';

import { useGetRelays } from 'src/hooks/useGetRelays';

type Props = {
  pubkey: string;
};

const UserRelays = ({ pubkey }: Props) => {
  useGetRelays({ pubkey });

  return <></>;
};

export default UserRelays;
