import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from 'src/constants/rootStackParams';

import { Post } from 'src/interfaces/post/post';

type Props = {
  item: Post;
  index: number;
};

type profileScreenProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfilePostListItem = ({ item, index }: Props) => {
  const navigation = useNavigation<profileScreenProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('FeedItem', { profile: true, currentItem: index })}
    >
      <Image style={styles.image} source={{ uri: item?.image }} />
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
