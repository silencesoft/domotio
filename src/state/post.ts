import { atom } from 'jotai';

import { Post } from 'src/interfaces/post/post';
import { getFeed } from 'src/services/getFeed';

export const postsAtom = atom<Promise<Post[]>>(async () => {
  const posts = getFeed();

  return posts;
});
