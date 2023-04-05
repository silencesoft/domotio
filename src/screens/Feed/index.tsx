import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import PostSingle from 'src/components/post';
import { RootStackParamList } from 'src/constants/rootStackParams';
import useMaterialNavBarHeight from 'src/hooks/useMaterialNavBarHeight';
import { currentPostAuthorAtom, postsAtom } from 'src/state/post';

interface Props extends StackScreenProps<RootStackParamList, 'Feed'> {}

interface RefObject {
  play: () => void;
  stop: () => void;
}

const FeedScreen = ({ route }: Props) => {
  const setCurrentPostAuthor = useSetAtom(currentPostAuthorAtom);
  const profile = '';
  const setCurrentUserProfileItemInView = undefined;
  // const [posts, setPosts] = useState([]);
  const mediaRefs = useRef<Array<RefObject>>([]);
  const posts = useAtomValue(postsAtom);

  useEffect(() => {
    if (profile) {
      // getPostsByUserId(creator).then(setPosts);
    } else {
      // getFeed().then(setPosts);
    }
  }, []);

  const onViewableItemsChanged = useRef(({ changed }: any) => {
    changed.forEach((element: any, index: number) => {
      const cell = mediaRefs.current[index];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            setCurrentPostAuthor(element.username);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(!!profile);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
        <PostSingle item={item} ref={(PostSingleRef: any) => (mediaRefs.current[index] = PostSingleRef)} />
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
