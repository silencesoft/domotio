import { useSetAtom } from 'jotai';
import { useProfile } from 'nostr-react';
import { useEffect } from 'react';

import { userProfileAtom } from 'src/state/nostr';

type Props = {
  pubkey: string;
};

export const useGetUserProfile = ({ pubkey }: Props) => {
  const setUserProfile = useSetAtom(userProfileAtom);
  const { isLoading, data: userData } = useProfile({
    pubkey,
  });
  const eventsString = JSON.stringify(userData);

  useEffect(() => {
    if (!isLoading) {
      setUserProfile(userData);
    }
  }, [eventsString, isLoading]);

  return { isLoading };
};
