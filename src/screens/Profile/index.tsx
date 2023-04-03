import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from 'src/components/profile/header';
import ProfileNavBar from 'src/components/profile/navBar';
import ProfilePostList from 'src/components/profile/postList';
import { RootStackParamList } from 'src/constants/rootStackParams';
import { User } from 'src/interfaces/user/user';
import { pubKeyAtom } from 'src/state/user';

interface Props extends StackScreenProps<RootStackParamList, 'Profile'> {}

const ProfileScreen = ({ route }: Props) => {
  const { id } = route.params;
  const currentUser = useAtomValue(pubKeyAtom);
  const user: User = {} as User;
  const userPosts: [] = [];

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ScrollView>
        <ProfileHeader user={user} />
        <ProfilePostList posts={userPosts} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
