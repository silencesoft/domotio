import { atom } from 'jotai';

import { defaultRelays } from 'src/constants/defaultValues';
import { Filter } from 'src/interfaces/nostr/filter';
import { Relay } from 'src/interfaces/nostr/relay';
import { Post } from 'src/interfaces/post/post';

export const relaysAtom = atom<Relay[]>(defaultRelays);
export const userRelaysAtom = atom(false);

export const userProfileAtom = atom<any>({});
export const postsAtom = atom<Post[]>([]);
export const userContactsAtom = atom<any[]>([]);
export const userLoadedContactsAtom = atom(false);

export const profilePostsAtom = atom<Post[]>([]);

// <Author[]>
export const authorsAtom = atom(async (get) => {
  const authors: string[] = [];

  // authors.push(process.env.NEXT_PUBLIC_ADMIN || '');

  // const authors = await getAuthors();

  return authors;
});

export const profilesAtom = atom({});

export const tagsAtom = atom<string[]>([]);

export const filterAtom = atom<Filter>({} as Filter);
