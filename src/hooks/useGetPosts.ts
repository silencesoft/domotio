import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { dateToUnix, useNostrEvents } from 'nostr-react';
import { useEffect, useRef } from 'react';

import { defaultFilter } from 'src/constants/defaultValues';
import { NostrKind } from 'src/constants/nostr';
import { Filter } from 'src/interfaces/nostr/filter';
import { Post } from 'src/interfaces/post/post';
import { postsAtom, profilePostsAtom, tagsAtom, userContactsAtom } from 'src/state/nostr';

type Props = {
  filter?: Filter;
  author?: boolean;
  newPage?: boolean;
};

export const useGetPosts = ({ filter = defaultFilter, author = false, newPage = false }: Props) => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [authorPosts, setAuthorPosts] = useAtom(profilePostsAtom);
  const setTags = useSetAtom(tagsAtom);
  const authors: string[] = useAtomValue(userContactsAtom);
  const now = useRef(new Date());
  const event: any = {
    filter: {
      authors,
      until: dateToUnix(now.current),
      kinds: [NostrKind.ShortVideo],
      limit: 10,
    },
  };
  // setFilter(filter);

  if (filter?.type) {
    let type = '';
    switch (filter.type) {
      case 'tag':
        type = '#t';
        event.filter[type] = [filter.value];
        break;
      case 'author':
        type = 'authors';
        event.filter[type] = [filter.value];
        break;
      case 'post':
        type = 'ids';
        event.filter[type] = [filter.value];
        break;
      default:
        break;
    }
  }

  const { events, isLoading } = useNostrEvents(event);
  const eventsString = JSON.stringify(events);

  useEffect(() => {
    const data: Post[] = [];
    let list: string[] = [];

    events.forEach((event) => {
      const video = event.tags.filter((tag) => tag[0] === 'r');
      const image = event.tags.filter((tag) => tag[0] === 'image');
      const publishedAt = event.tags.filter((tag) => tag[0] === 'published_at');
      const tags = event.tags.filter((tag) => tag[0] === 't');
      const aRefs = event.tags.filter((tag) => tag[0] === 'a');
      const eRefs = event.tags.filter((tag) => tag[0] === 'e');
      const pRefs = event.tags.filter((tag) => tag[0] === 'p');
      list = [...list, ...tags.map((tag) => tag[1].toLowerCase())];
      const exist = !author
        ? posts.some((post) => post.id === event.id)
        : authorPosts.some((post) => post.id === event.id);

      if (!exist) {
        data.push({
          id: event.id,
          content: event.content,
          video: video.length ? video[0][1] : '',
          image: image.length ? image[0][1] : '',
          author: event.pubkey,
          published_at: publishedAt.length ? parseInt(publishedAt[0][1]) : 0,
          tags: tags.map((tag) => tag[1].toLowerCase()),
          aRefs: aRefs.map((aRef) => {
            return { pos: parseInt(aRef[2]), value: aRef[1].toLowerCase() };
          }),
          eRefs: eRefs.map((eRef) => {
            return { pos: parseInt(eRef[2]), value: eRef[1].toLowerCase() };
          }),
          pRefs: pRefs.map((pRef) => {
            return { pos: parseInt(pRef[2]), value: pRef[1].toLowerCase() };
          }),
        });
      }
    });

    if (!author) {
      setTags(list.filter((item, index) => list.indexOf(item) === index));
    }

    if (!isLoading) {
      if (data.length) {
        if (!author) {
          setPosts([...posts, ...data]);
        } else {
          setAuthorPosts([...authorPosts, ...data]);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsString, filter.value, isLoading]);

  return { authorPosts, posts, isLoading };
};
