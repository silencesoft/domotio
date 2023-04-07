import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Post } from 'src/interfaces/post/post';
import ProfilePostListItem from './item';

type Props = {
  posts: Post[];
};

const ProfilePostList = ({ posts }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <ProfilePostListItem item={item} index={index} />}
      />
    </View>
  );
};

export default ProfilePostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
