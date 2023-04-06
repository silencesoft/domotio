import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { useGetPosts } from 'src/hooks/useGetPosts';
import { postsAtom } from 'src/state/nostr';
import RenderItem from './item';

type Props = {};

const Feed = (props: Props) => {
  const profile = '';
  const posts = useAtomValue(postsAtom);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [active, setActive] = useState(0);

  useGetPosts({});

  useEffect(() => {
    if (profile) {
      // getPostsByUserId(creator).then(setPosts);
    } else {
      // getFeed().then(setPosts);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={windowWidth}
        height={windowHeight}
        vertical={true}
        autoPlay={false}
        data={[...new Array(posts.length).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActive(index)}
        renderItem={({ index }) => RenderItem({ index, active })}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({ container: { flex: 1 } });
