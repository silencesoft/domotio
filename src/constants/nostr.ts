import { Kind } from 'nostr-tools';

enum OtherKind {
  LongFormat = 30023,
  ShortVideo = 30101,
}

export const NostrKind = { ...Kind, ...OtherKind };
