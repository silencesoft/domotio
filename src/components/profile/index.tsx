import { useAtomValue } from 'jotai';
import { useProfile } from 'nostr-react';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from 'src/components/profile/header';
import ProfileNavBar from 'src/components/profile/navBar';
import ProfilePostList from 'src/components/profile/postList';
import { useGetPosts } from 'src/hooks/useGetPosts';
import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import { profilePostsAtom } from 'src/state/nostr';
import { currentPostAuthorAtom } from 'src/state/post';
import { pubKeyAtom } from 'src/state/user';

type Props = { embed: boolean };

const Profile = ({ embed }: Props) => {
  const id = useAtomValue(currentPostAuthorAtom);
  const currentUserId = useAtomValue(pubKeyAtom);
  const pubkey = embed ? id : currentUserId;
  const userPosts: Post[] = useAtomValue(profilePostsAtom);
  const { data: userData } = useProfile({
    pubkey: pubkey || '',
  });

  useGetPosts({ filter: { type: 'author', value: pubkey || '' }, author: true });

  if (!userData) {
    return <View style={styles.container}></View>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={userData || ({} as User)} />
      <ScrollView>
        <ProfileHeader user={userData || ({} as User)} />
        <ProfilePostList posts={userPosts} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
