import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { useGetPosts } from 'src/hooks/useGetPosts';
import { postsAtom, profilePostsAtom } from 'src/state/nostr';
import RenderItem from './item';

type Props = {
  profile: boolean;
  currentItem: number;
};

const Feed = ({ profile = false, currentItem = 0 }: Props) => {
  const posts = useAtomValue(postsAtom);
  const profilePosts = useAtomValue(profilePostsAtom);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [active, setActive] = useState(currentItem);
  const count = profile ? profilePosts.length : posts.length;

  useGetPosts({});

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={windowWidth}
        height={windowHeight}
        vertical={true}
        autoPlay={false}
        data={[...new Array(count).keys()]}
        defaultIndex={active}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActive(index)}
        renderItem={({ index }) => RenderItem({ index, active, profile })}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({ container: { flex: 1 } });
