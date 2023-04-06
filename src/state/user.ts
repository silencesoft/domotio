import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { getPublicKey } from 'nostr-tools';

import { storage } from 'src/utils/storage';

export const loginKeyAtom = atomWithDefault<string>(async () => (await storage.getString('loginKey')) as string);

export const pubKeyAtom = atom<Promise<string>>(async (get) => {
  const privKey = await get(loginKeyAtom);

  if (!privKey) {
    return '';
  }

  return getPublicKey(privKey);
});
