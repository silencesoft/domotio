import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import Profile from 'src/components/profile';
import { RootStackParamList } from 'src/constants/rootStackParams';
import { useGetPosts } from 'src/hooks/useGetPosts';
import { currentPostAuthorAtom } from 'src/state/post';
import { profilePostsAtom } from 'src/state/nostr';

interface Props extends StackScreenProps<RootStackParamList, 'Profile'> {}

const ProfileScreen = ({ route }: Props) => {
  const { embed } = route?.params ? route.params : { embed: false };
  const currentPostAuthor = useAtomValue(currentPostAuthorAtom);
  const setProfilePosts = useSetAtom(profilePostsAtom);
  const isFocused = useIsFocused();

  if (!embed) {
    setProfilePosts([]);
  }

  if (embed && !isFocused) {
    return <></>;
  }

  return (
    <Suspense fallback={<ActivityIndicator size={'large'} />}>
      {(currentPostAuthor || !embed) && <Profile embed={!!embed} />}
    </Suspense>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
