import { ResizeMode, Video } from 'expo-av';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import PostSingleOverlay from './overlay';

type Props = {
  item: Post;
};

const PostSingle = forwardRef(({ item }: Props, parentRef) => {
  const ref = useRef<Video | null>(null);
  const user = {} as User; // useUser(item.creator).data;
  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  const play = async () => {
    if (ref.current == null) {
      return;
    }

    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (ref.current == null) {
      return;
    }

    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    play();

    return () => unload();
  }, []);

  return (
    <>
      <PostSingleOverlay user={user} post={item} />
      <Video
        ref={ref}
        style={styles.container}
        resizeMode={ResizeMode.COVER}
        shouldPlay={false}
        isLooping
        usePoster
        posterSource={{ uri: item.media }}
        posterStyle={{ resizeMode: 'cover', height: '100%' }}
        source={{ uri: item.media }}
      />
    </>
  );
});

export default PostSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
