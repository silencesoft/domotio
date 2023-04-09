import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Remark } from 'react-remark';
import { nip19 } from 'nostr-tools';

import { Refs } from 'src/interfaces/post/post';
import { useUpdateContent } from 'src/hooks/useUpdateContent';

type Props = {
  content: string;
  pRefs: Refs[];
};

const PostContent = ({content, pRefs}: Props) => {
  // const [reactContent, setMarkdownSource] = useRemark();
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


  content.replaceAll('\\n', "&nbsp; \\n\\n");

  const [output, setOutput] = useState(content);

  useUpdateContent({ output, setOutput, pRefs });

  return (
    <>
      <Text style={styles.description}><Remark>{output}</Remark></Text>
    </>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    color: 'white',
    // textShadow: '3px 3px black',
  },
});

