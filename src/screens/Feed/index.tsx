import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import PostSingle from 'src/components/post';

import { RootStackParamList } from 'src/constants/rootStackParams';
import useMaterialNavBarHeight from 'src/hooks/useMaterialNavBarHeight';
import { postsAtom } from 'src/state/post';

interface Props extends StackScreenProps<RootStackParamList, 'Feed'> {}

const FeedScreen = ({ route }: Props) => {
  // const { setCurrentUserProfileItemInView, creator, profile } = route.params;
  const profile = '';
  const setCurrentUserProfileItemInView = undefined;
  // const [posts, setPosts] = useState([]);
  const mediaRefs = useRef([]);
  const posts = useAtomValue(postsAtom);

  useEffect(() => {
    if (profile) {
      // getPostsByUserId(creator).then(setPosts);
    } else {
      // getFeed().then(setPosts);
    }
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            // setCurrentUserProfileItemInView(element.item.creator);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(!!profile);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
        <PostSingle item={item} ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({ container: { flex: 1 } });
