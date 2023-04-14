import React, { useEffect, useRef } from 'react';
import { dateToUnix, useNostr } from 'nostr-react';
import { Event as NostrEvent, getEventHash, signEvent, verifySignature } from 'nostr-tools';

import { NostrKind } from 'src/constants/nostr';

type Props = {
};

export const useSendEvents = (props: Props) => {
  const { publish } = useNostr();

  const like = (pubkey: string, loginkey: string, authorkey: string, notekey: string, setLoading: (value: boolean) => void) => {
    setLoading(true);
    const now = new Date();
    const date = dateToUnix(now);

    const event: NostrEvent = {
      content: '+',
      kind: NostrKind.Reaction,
      created_at: date,
      pubkey: pubkey || '',
      id: '',
      sig: '',
      tags: [
        ['p', authorkey],
        ['e', notekey],
      ],
    };

   try {
      event.id = getEventHash(event);
      event.sig = signEvent(event, loginkey);

      publish(event);

      const ok = verifySignature(event);

      if (ok) {
        setLoading(false);
      } else {
        // setError('title', { message: 'Error in server' });
        setLoading(false);
      }
    } catch (e) {
      console.log({ e });
      setLoading(false);
      // setError('title', { message: 'Error in server or event signature' });
    }

  }

  return {
    like,
  }
};

