import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Profile from 'src/components/profile';
import { RootStackParamList } from 'src/constants/rootStackParams';
import { useGetPosts } from 'src/hooks/useGetPosts';
import { currentPostAuthorAtom } from 'src/state/post';

interface Props extends StackScreenProps<RootStackParamList, 'Profile'> {}

const ProfileScreen = ({ route }: Props) => {
  const { embed } = route?.params ? route.params : { embed: false };
  const currentPostAuthor = useAtomValue(currentPostAuthorAtom);

  return (
    <Suspense fallback={<ActivityIndicator size={'large'} />}>
      {currentPostAuthor && <Profile embed={!!embed} />}
    </Suspense>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
