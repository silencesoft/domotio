import { useAtom, useSetAtom } from 'jotai';
import { useNostrEvents } from 'nostr-react';
import { useEffect } from 'react';

import { NostrKind } from 'src/constants/nostr';
import { userContactsAtom, userLoadedContactsAtom } from 'src/state/nostr';

type Props = {
  pubkey: string;
};

export const useGetContacts = ({ pubkey }: Props) => {
  const [userContacts, setUserContacts] = useAtom(userContactsAtom);
  const setUserLoadedContacts = useSetAtom(userLoadedContactsAtom);
  const event: any = {
    filter: {
      kinds: [NostrKind.Contacts],
      authors: [pubkey],
    },
  };

  const { events, isLoading } = useNostrEvents(event);
  const eventsString = JSON.stringify(events);

  useEffect(() => {
    const data: any[] = [];

    events.forEach((event) => {
      event.tags.forEach((tag) => {
        const current = data.includes(tag[1]);
        const exist = userContacts.includes(tag[1]);

        if (!exist && !current) {
          data.push(tag[1]);
        }
      });

      if (!isLoading) {
        setUserContacts([...userContacts, ...data]);
        setUserLoadedContacts(true);
      }
    });
  }, [eventsString, isLoading]);

  return { isLoading };
};
