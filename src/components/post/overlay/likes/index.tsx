import { Ionicons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useGetPostValues } from 'src/hooks/useGetPostValues';
import { useSendEvents } from 'src/hooks/useSendEvents';
import { loginKeyAtom, pubKeyAtom } from 'src/state/user';

type Props = {
  author: string;
  note: string;
};

const PostLikes = ({ author, note }: Props) => {
  const sendEvents = useSendEvents({});
  const [loading, setLoading] = useState(false);
  const pubkey = useAtomValue(pubKeyAtom);
  const loginKey = useAtomValue(loginKeyAtom);
  const { likes } = useGetPostValues({ eventKey: note });
  const state = likes.includes(author);
  const counter = likes.length;

  const handleUpdateLike = async () => {
    if (likes.includes(author)) return;

    await sendEvents.like(pubkey, loginKey, author, note, setLoading);
  };

  return (
    <View>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateLike()}>
        <Ionicons color="white" size={40} name={state ? 'heart' : 'heart-outline'} />
        <Text style={styles.actionButtonText}>{counter}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostLikes;

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
