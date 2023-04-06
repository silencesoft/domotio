import React from 'react';
import { useGetUserProfile } from 'src/hooks/useGetUserProfile';

type Props = {
  pubkey: string;
};

const UserInformation = ({ pubkey }: Props) => {
  useGetUserProfile({ pubkey });

  return <></>;
};

export default UserInformation;
