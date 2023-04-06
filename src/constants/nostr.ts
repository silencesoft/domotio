import { Kind } from 'nostr-tools';

enum OtherKind {
  LongFormat = 30023,
  ShortVideo = 30024,
}

export const NostrKind = { ...Kind, ...OtherKind };
