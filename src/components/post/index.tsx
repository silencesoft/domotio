import { ResizeMode, Video } from 'expo-av';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import PostSingleOverlay from './overlay';

type Props = {
  item: Post;
  index?: number;
  active?: boolean;
};

const PostSingle = forwardRef(({ item, active }: Props, parentRef) => {
  const spinValue = new Animated.Value(0);
  const [play, setPlay] = useState(active);
  const videoRef = useRef<Video | null>(null);
  const user = {} as User;
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (videoRef) {
      if (active) {
        setPlay(true);
        videoRef.current?.playAsync();
      } else {
        setPlay(false);
        videoRef.current?.pauseAsync();
      }
    }
  }, [active, videoRef]);

  useEffect(() => {
    if (videoRef) {
      if (play) {
        // setPlay(true);
        videoRef.current?.playAsync();
      } else {
        // setPlay(false);
        videoRef.current?.pauseAsync();
      }
    }
  }, [play, videoRef]);

  useEffect(() => {
    if (!isFocused && videoRef) {
      setPlay(false);
      videoRef.current?.pauseAsync();
    }
  }, [isFocused]);

  return (
    <>
      <PostSingleOverlay user={user} post={item} play={play} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ minWidth: '100%', minHeight: '100%' }}
        onPress={() => setPlay(!play)}
      >
        <Video
          ref={videoRef}
          style={styles.container}
          resizeMode={ResizeMode.COVER}
          shouldPlay={active}
          isLooping
          usePoster
          posterSource={{ uri: item.video }}
          posterStyle={{ resizeMode: 'cover', height: '100%' }}
          videoStyle={{
            height: '100%',
            width: 'auto',
            marginTop: 0,
            marginLeft: 'auto',
            marginBottom: 0,
            marginRight: 'auto',
          }}
          source={{ uri: item.video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
        />
      </TouchableOpacity>
    </>
  );
});

export default PostSingle;

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1,
    flex: 1,
  },
  details: {
    position: 'absolute',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: '65%',
    flexDirection: 'column',
    bottom: Platform.OS === 'web' ? 100 : 0,
    left: 10,
    zIndex: 10,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fff',
  },
  tags: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
  },
  musicBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  music: {
    fontSize: 15,
    padding: 5,
    paddingBottom: 15,
    flexShrink: 1,
    color: '#fff',
  },
});
