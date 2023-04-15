import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useSendEvents } from 'src/hooks/useSendEvents';
import { userProfileAtom } from 'src/state/nostr';
import { loginKeyAtom, pubKeyAtom } from 'src/state/user';

type Props = {
  nip?: string;
};

const PostZap = ({ nip }: Props) => {
  const sendEvents = useSendEvents({});
  const [loading, setLoading] = useState(false);
  const pubkey = useAtomValue(pubKeyAtom);
  const loginKey = useAtomValue(loginKeyAtom);
  const userProfile = useAtomValue(userProfileAtom);

  if (!nip) {
    return <></>;
  }

  return (
    <View>
      <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL(`lightning:${nip}`)}>
        <MaterialCommunityIcons color="white" name="lightning-bolt" size={40} />
        <Text style={styles.actionButtonText}>{'0'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostZap;

const styles = StyleSheet.create({
  actionButton: {
    paddingBottom: 16,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
  },
});
