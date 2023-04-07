import { Metadata, useNostrEvents } from 'nostr-react';
import { useEffect, useState } from 'react';

import { Refs } from 'src/interfaces/post/post';

type Props = {
  output: string;
  setOutput: (value: string) => void;
  aRefs?: Refs[];
  eRefs?: Refs[];
  pRefs?: Refs[];
};

export const useUpdateContent = ({ output, setOutput, aRefs, eRefs, pRefs }: Props) => {
  const [authorsList, setAuthorsList] = useState(pRefs?.map((pRef) => pRef.value) || []);
  const { events: authors, isLoading: authorsLoading } = useNostrEvents({
    filter: {
      authors: authorsList,
      kinds: [0],
    },
  });
  const [force, setForce] = useState(true);

  useEffect(() => {
    if (!force) return;

    const updateValue = () => {
      let replaced = output;

      if (!authorsLoading) {
        authors.forEach((author) => {
          const value: Refs[] = pRefs?.filter((pRef) => pRef.value === author.pubkey) || ([] as Refs[]);
          const userData: Metadata = JSON.parse(author.content);
          let search = '';

          if (value?.length) {
            search = `[${value[0].value}](nostr`;
          } else {
            search = `[${author.pubkey}](nostr`;
          }

          if (userData?.name) {
            replaced = replaced.replaceAll(search, `[@${userData.name}](nostr`);

            const searchImage = `[${author.pubkey}.image]`;

            replaced = replaced.replaceAll(
              searchImage,
              `<img alt="@${userData.name}" src="${userData?.picture}" width="200" />`
            );
          }
        });

        setOutput(replaced);

        if (authors.length === authorsList?.length) {
          setForce(false);
        }
      }
    };

    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors.length, force, authorsLoading]);
};
