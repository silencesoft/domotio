import { StackScreenProps } from '@react-navigation/stack';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FeedList from 'src/components/feed';

import { RootStackParamList } from 'src/constants/rootStackParams';
import { userContactsAtom } from 'src/state/nostr';

interface Props extends StackScreenProps<RootStackParamList, 'Feed'> {}

const FeedScreen = ({ route, navigation }: Props) => {
  const userContacts = useAtomValue(userContactsAtom);
  const profile = route?.params?.profile;
  const currentItem = route?.params?.currentItem;

  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size={'large'} />}>
        {!!userContacts.length && <FeedList profile={profile} currentItem={currentItem} />}
      </Suspense>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
