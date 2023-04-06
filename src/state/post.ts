import { atom } from 'jotai';

// export const postsAtom = atom<Promise<Post[]>>(async () => {
//   const posts = getFeed();

//   return posts;
// });

export const currentPostAuthorAtom = atom<string | null>(null);
