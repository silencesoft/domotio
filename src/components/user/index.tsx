import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';

import { userLoadedContactsAtom, userProfileAtom, userRelaysAtom } from 'src/state/nostr';
import UserContacts from './contacts';
import UserInformation from './information';
import UserRelays from './relays';

type Props = {
  pubkey: string;
};

const User = ({ pubkey }: Props) => {
  const userProfile = useAtomValue(userProfileAtom);
  const userRelays = useAtomValue(userRelaysAtom);
  const userLoadedContacts = useAtomValue(userLoadedContactsAtom);

  return (
    <Suspense>
      {pubkey && (
        <>
          {!userProfile?.name && <UserInformation pubkey={pubkey} />}
          {!userRelays && <UserRelays pubkey={pubkey} />}
          {!userLoadedContacts && <UserContacts pubkey={pubkey} />}
        </>
      )}
    </Suspense>
  );
};

export default User;
