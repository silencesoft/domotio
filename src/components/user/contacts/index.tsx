import React from 'react';

import { useGetContacts } from 'src/hooks/useGetContacts';

type Props = {
  pubkey: string;
};

const UserContacts = ({ pubkey }: Props) => {
  useGetContacts({ pubkey });

  return <></>;
};

export default UserContacts;
