import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useProfile } from 'nostr-react';
import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';

import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';

type Props = {
  user: User;
  post: Post;
};

const PostSingleOverlay = ({ user, post }: Props) => {
  const navigation = useNavigation();
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });
  const { data: userData } = useProfile({
    pubkey: post.author,
  });

  const handleUpdateLike = (currentLikeState: { state: boolean; counter: number }): void => {
    throw new Error('Function not implemented.');
  };

  return (
    <View style={styles.container}>
      <View style={{ maxWidth: '50%' }}>
        <Text style={styles.displayName}>@{userData?.name}</Text>
        <Text style={styles.description}>{post.content}</Text>
      </View>

      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { embed: true })}>
          {userData?.picture ? (
            <Avatar.Image source={userData?.picture as AvatarImageSource} size={46} style={styles.avatar} />
          ) : (
            <Avatar.Icon icon="account" size={46} style={styles.avatar} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateLike(currentLikeState)}>
          <Ionicons color="white" size={40} name={currentLikeState.state ? 'heart' : 'heart-outline'} />
          <Text style={styles.actionButtonText}>{currentLikeState.counter}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Ionicons color="white" size={40} name={'chatbubble'} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostSingleOverlay;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 999,
    bottom: Platform.OS === 'web' ? 100 : 0,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  displayName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadow: '3px 3px black',
  },
  description: {
    marginTop: 10,
    color: 'white',
    textShadow: '3px 3px black',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 30,
  },
  leftContainer: {
    alignItems: 'center',
  },
  actionButton: {
    paddingBottom: 16,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
  },
});
