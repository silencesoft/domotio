import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Post } from 'src/interfaces/post/post';

type Props = {
  item: Post;
};

const ProfilePostListItem = ({ item }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('FeedItem', { profile: true })}>
      <Image style={styles.image} source={{ uri: item?.media[1] }} />
    </TouchableOpacity>
  );
};

export default ProfilePostListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    height: 200,
    backgroundColor: 'gray',
  },
  image: {
    flex: 1,
  },
});
