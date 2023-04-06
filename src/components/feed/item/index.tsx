import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';

import PostSingle from 'src/components/post';
import { postsAtom } from 'src/state/nostr';
import { currentPostAuthorAtom } from 'src/state/post';

const RenderItem = ({ active, index }: { active: number; index: number }) => {
  const setCurrentPostAuthor = useSetAtom(currentPostAuthorAtom);
  const posts = useAtomValue(postsAtom);

  useEffect(() => {
    if (active === index) {
      setCurrentPostAuthor(posts[active].author);
    }
  }, [active]);

  if (!posts[index]) {
    return <></>;
  }

  const feedItemHeight = Dimensions.get('window').height; // - useMaterialNavBarHeight(!!profile);

  return (
    <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
      <PostSingle item={posts[index]} active={active === index} />
    </View>
  );
};

export default RenderItem;
