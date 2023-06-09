import { useAtomValue } from 'jotai';
import { NostrProvider } from 'nostr-react';
import React from 'react';

import { relaysAtom } from 'src/state/nostr';

type Props = {
  children: JSX.Element;
};

const NostrDataProvider: React.FC<Props> = ({ children }: Props) => {
  const relays = useAtomValue(relaysAtom);

  if (!relays.length) {
    return <>{children}</>;
  }

  return (
    <NostrProvider relayUrls={relays.map((relay) => relay.relay)} debug={false}>
      {children}
    </NostrProvider>
  );
};

export default NostrDataProvider;
