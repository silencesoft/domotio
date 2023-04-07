import { useSetAtom } from 'jotai';
import { useNostrEvents } from 'nostr-react';
import { useEffect } from 'react';

import { NostrKind } from 'src/constants/nostr';
import { Relay } from 'src/interfaces/nostr/relay';
import { relaysAtom, userRelaysAtom } from 'src/state/nostr';

type Props = {
  pubkey: string;
};

export const useGetRelays = ({ pubkey }: Props) => {
  const setRelays = useSetAtom(relaysAtom);
  const setUserRelays = useSetAtom(userRelaysAtom);
  const event: any = {
    filter: {
      kinds: [NostrKind.RelayList],
      authors: [pubkey],
    },
  };

  const { events, isLoading } = useNostrEvents(event);
  const eventsString = JSON.stringify(events);

  useEffect(() => {
    const data: Relay[] = [];

    events.forEach((event) => {
      event.tags.forEach((tag) => {
        data.push({ relay: tag[1], type: tag?.[2] || '' });
      });

      if (!isLoading) {
        data.push({relay: 'ws://192.168.1.225:8080'});
        setRelays(data);
        setUserRelays(true);
      }
    });
  }, [eventsString, isLoading]);

  return { isLoading };
};
