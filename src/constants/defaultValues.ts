import { Filter } from 'src/interfaces/nostr/filter';
import { Relay } from 'src/interfaces/nostr/relay';

export const defaultFilter: Filter = { type: '', value: '' };

export const defaultRelays: Relay[] = [{relay: 'wss://nos.lol'}, {relay: 'wss://brb.io'}];
