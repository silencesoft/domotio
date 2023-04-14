import { nip19 } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';


import { useUpdateContent } from 'src/hooks/useUpdateContent';
import { Refs } from 'src/interfaces/post/post';

type Props = {
  content: string;
  pRefs: Refs[];
};

const PostContent = ({ content, pRefs }: Props) => {
  pRefs?.forEach((pRef) => {
    const search = `#[${pRef.pos}]`;
    const value = pRef.value.match(/[0-9A-Fa-f]{6}/g) ? nip19.npubEncode(pRef.value) : pRef.value; 

    content = content.replace(search, `[${pRef.value}](nostr:${value})`);
  });

  const profiles = content.match(/npub\w+/gi);

  profiles?.forEach((profile) => {
    const user = nip19.decode(profile.replace('@', ''));

    content = content.replaceAll(profile, `[${user.data}](nostr:${profile.replace('@', '')})`);

    const exist = pRefs.filter((pRef) => pRef.value === user.data.toString());

    if (!exist.length) {
      pRefs.push({ pos: 0, value: user.data.toString() });
    }
  });

  const profilesNip = content.match(/nostr:\w+/gi);

  profilesNip?.forEach((profile) => {
    let user;

    if (profile.match(/[0-9A-Fa-f]{6}/g)) {
      user = profile.replace('nostr:', '');
    } else {
      user = nip19.decode(profile.replace('nostr:', ''));
    }

    content = content.replaceAll(profile, `[${user}](${profile})`);

    const exist = pRefs.filter((pRef) => pRef.value === user.toString());

    if (!exist.length) {
      pRefs.push({ pos: 0, value: user.toString() });
    }
  });

  const [output, setOutput] = useState('');

  useUpdateContent({ output: content.toString(), setOutput, pRefs });

  return (
    <View style={styles.description}>
      <Markdown style={{ body: { color: 'white' } }}>{output.trim()}</Markdown>
    </View>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  description: {
    // marginTop: 10,
    color: 'white',
    // textShadow: '3px 3px black',
  },
});
