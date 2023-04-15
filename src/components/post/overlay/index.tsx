import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfile } from 'nostr-react';
import React from 'react';
import { Animated, Dimensions, Easing, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/rootStackParams';
import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import PostContent from './content';
import PostZap from './lightning';
import PostLikes from './likes';

type Props = {
  user: User;
  post: Post;
  play?: boolean;
};

type feedScreenProp = StackNavigationProp<RootStackParamList, 'Feed'>;

const PostSingleOverlay = ({ user, post, play }: Props) => {
  const navigation = useNavigation<feedScreenProp>();
  const { data: userData } = useProfile({
    pubkey: post.author,
  });
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const rotateProp = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const content = post.content;
  const pRefs = post.pRefs || [];

  return (
    <View style={styles.container}>
      <View style={{ maxWidth: '65%' }}>
        <Text style={styles.displayName}>@{userData?.name}</Text>
        <View>
          <PostContent content={content} pRefs={pRefs} />
          <Text style={[styles.description]}>{post.tags.map((tag: string) => `#${tag} `)}</Text>
        </View>
      </View>

      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { embed: true })}>
          {userData?.picture ? (
            <Avatar.Image source={{ uri: userData?.picture }} size={46} style={styles.avatar} />
          ) : (
            <Avatar.Icon icon="account" size={46} style={styles.avatar} />
          )}
        </TouchableOpacity>

        <PostLikes author={post.author} note={post.id} />

        <PostZap nip={userData?.lud16} />

        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Ionicons color="white" size={40} name={'chatbubble'} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <Animated.View
          style={{
            borderRadius: 50,
            borderWidth: 12,
            borderColor: '#292929',
            transform: [
              {
                rotate: play ? rotateProp : '0deg',
              },
            ],
          }}
        >
          {userData?.picture ? (
            <Avatar.Image
              source={{ uri: userData?.picture }}
              size={35}
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
            />
          ) : (
            <Avatar.Icon
              icon="account"
              size={35}
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
            />
          )}
        </Animated.View>
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
    bottom: Platform.OS === 'web' ? 100 : 80,
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
    // textShadow: '3px 3px black',
  },
  description: {
    marginTop: 10,
    color: 'white',
    // textShadow: '3px 3px black',
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
    position: 'absolute',
    right: 20,
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
