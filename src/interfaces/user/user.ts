import { Metadata } from 'nostr-react';

export type User = Metadata & { npub: string; id?: string };
