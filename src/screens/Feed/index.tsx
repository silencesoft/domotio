import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import PostSingle from 'src/components/post';
import { RootStackParamList } from 'src/constants/rootStackParams';
import useMaterialNavBarHeight from 'src/hooks/useMaterialNavBarHeight';
import { currentPostAuthorAtom, postsAtom } from 'src/state/post';

interface Props extends StackScreenProps<RootStackParamList, 'Feed'> {}

const FeedScreen = ({ route, navigation }: Props) => {
  const setCurrentPostAuthor = useSetAtom(currentPostAuthorAtom);
  const profile = '';
  const posts = useAtomValue(postsAtom);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (profile) {
      // getPostsByUserId(creator).then(setPosts);
    } else {
      // getFeed().then(setPosts);
    }
  }, []);

  useEffect(() => {
    setCurrentPostAuthor(posts[active].username);
  }, [active]);

  const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(!!profile);

  const renderItem = ({ index }: { index: number }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
        <PostSingle item={posts[index]} active={active === index} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={windowWidth}
        height={windowHeight}
        vertical={true}
        autoPlay={false}
        data={[...new Array(2).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActive(index)}
        renderItem={({ index }) => renderItem({ index })}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({ container: { flex: 1 } });
