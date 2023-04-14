import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProfile } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import React from 'react';
import { useAtomValue } from 'jotai';

import { RootStackParamList } from 'src/constants/rootStackParams';
import { useUpdateContent } from 'src/hooks/useUpdateContent';
import { Post } from 'src/interfaces/post/post';
import { User } from 'src/interfaces/user/user';
import { useSendEvents } from 'src/hooks/useSendEvents';
import { loginKeyAtom, pubKeyAtom } from 'src/state/user';

import { useGetPostValues } from 'src/hooks/useGetPostValues';

type Props = {
  author: string;
  note: string;
};

const PostLikes = ({author, note}: Props) => {
  const sendEvents = useSendEvents({});
  const [ loading, setLoading ] = useState(false);
  const pubkey = useAtomValue(pubKeyAtom);
  const loginKey = useAtomValue(loginKeyAtom);
  const { likes } = useGetPostValues({ eventKey: note }) ;
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
  )
}


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
