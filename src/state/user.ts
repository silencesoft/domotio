import { atomWithDefault } from 'jotai/utils';

import { storage } from 'src/utils/storage';

export const loginKeyAtom = atomWithDefault<string>(async () => (await storage.getString('loginKey')) as string);
