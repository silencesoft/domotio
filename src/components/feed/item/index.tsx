import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';

import PostSingle from 'src/components/post';
import { postsAtom, profilePostsAtom } from 'src/state/nostr';
import { currentPostAuthorAtom } from 'src/state/post';

const RenderItem = ({ active, index, profile }: { active: number; index: number; profile: boolean }) => {
  const setCurrentPostAuthor = useSetAtom(currentPostAuthorAtom);
  const posts = useAtomValue(postsAtom);
  const profilePosts = useAtomValue(profilePostsAtom);
  const items = profile ? profilePosts : posts;

  useEffect(() => {
    if (active === index) {
      setCurrentPostAuthor(items[active].author);
    }
  }, [active]);

  if (!posts[index] && !profilePosts[index]) {
    return <></>;
  }

  const feedItemHeight = Dimensions.get('window').height; // - useMaterialNavBarHeight(!!profile);

  return (
    <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
      <PostSingle item={items[index]} active={active === index} />
    </View>
  );
};

export default RenderItem;
