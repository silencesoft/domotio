import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfile } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import { useRemark } from 'react-remark';
import React from 'react';

import { RootStackParamList } from 'src/constants/rootStackParams';
import { useUpdateContent } from 'src/hooks/useUpdateContent';
import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import PostContent from './content';

type Props = {
  user: User;
  post: Post;
  play?: boolean;
};

type feedScreenProp = StackNavigationProp<RootStackParamList, 'Feed'>;

const PostSingleOverlay = ({ user, post, play }: Props) => {
  const navigation = useNavigation<feedScreenProp>();
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });
  const { data: userData } = useProfile({
    pubkey: post.author,
  });
  const spinValue = new Animated.Value(0);

  const handleUpdateLike = (currentLikeState: { state: boolean; counter: number }): void => {
    throw new Error('Function not implemented.');
  };

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
      <View style={{ maxWidth: '50%' }}>
        <Text style={styles.displayName}>@{userData?.name}</Text>
        <View
        // style={[styles.description, { overflowWrap: 'break-word' }]}
        >
          <PostContent content={content} pRefs={pRefs} />
          <Text style={[styles.description]}>{post.tags.map((tag) => `#${tag} `)}</Text>
        </View>
      </View>

      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { embed: true })}>
          {userData?.picture ? (
            <Avatar.Image source={{ uri: userData?.picture}} size={46} style={styles.avatar} />
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
              source={userData?.picture as AvatarImageSource}
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
    // textShadow: '3px 3px black',
shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // iOS
        shadowOffset: {
            width: 0,            // These can't both be 0
            height: 1,           // i.e. the shadow has to be offset in some way
        },
        // Android
        shadowOffset: {
            width: 0,            // Same rules apply from above
            height: 1,           // Can't both be 0
        },
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
