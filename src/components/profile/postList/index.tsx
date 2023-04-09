import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Post } from 'src/interfaces/post/post';
import ProfilePostListItem from './item';
import ProfileHeader from 'src/components/profile/header';
import { User } from 'src/interfaces/user/user';

type Props = {
  posts: Post[];
  user: User;
};

const ProfilePostList = ({ posts, user }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={posts}
        keyExtractor={(item) => item.id}
	ListHeaderComponent={() => <ProfileHeader user={user || ({} as User)} />}
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
