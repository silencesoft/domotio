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

    content = content.replace(search, `[${pRef.value}](nostr:${nip19.npubEncode(pRef.value)})`);
  });

  const profiles = content.match(/npub\w+/gi);

  profiles?.forEach((profile) => {
    const user = nip19.decode(profile.replace('@', ''));

    content = content.replace(profile, `[${user.data}](nostr:${profile.replace('@', '')})`);

    pRefs.push({ pos: 0, value: user.data.toString() });
  });

  const profilesNip = content.match(/nostr:\w+/gi);

  profilesNip?.forEach((profile) => {
    const user = profile.replace('nostr:', '');

    content = content.replace(profile, `[${user}](${profile})`);

    pRefs.push({ pos: 0, value: user.toString() });
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
