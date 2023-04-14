import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { dateToUnix, useNostrEvents } from 'nostr-react';
import { useEffect, useRef, useState } from 'react';

import { defaultFilter } from 'src/constants/defaultValues';
import { NostrKind } from 'src/constants/nostr';
import { Filter } from 'src/interfaces/nostr/filter';
import { Post } from 'src/interfaces/post/post';
import { postsAtom, profilePostsAtom, tagsAtom, userContactsAtom } from 'src/state/nostr';

type Props = {
  eventKey: string;
};

export const useGetPostValues = ({ eventKey }: Props) => {
  const [likes, setLikes] = useState<string[]>([]);
  const event: any = {
    filter: {
      kinds: [NostrKind.Reaction, NostrKind.Text, NostrKind.Zap],
      '#e': [eventKey],
    },
  };
  const { events, isLoading } = useNostrEvents(event);
  const eventsString = JSON.stringify(events);

  useEffect(() => {
    const list: string[] = [];

    events.forEach((event) => {
      const pRefs = event.tags.filter((tag) => tag[0] === 'p');

      if (event.kind === 7) {
        pRefs.forEach((pRef) => {
          const exist = likes.includes(pRef[1].toLowerCase());
	  const current = list.includes(pRef[1].toLowerCase());
	  if (!exist && !current) {
            list.push(pRef[1].toLowerCase());
	  }
        })
      }
    });

    if (!isLoading) {
      setLikes(list);
    }
  }, [eventsString, isLoading]);

  return { likes, isLoading };
};
