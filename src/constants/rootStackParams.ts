export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Record: undefined;
  UploadVideo: { source: string; sourceThumb?: string };
  Profile: { embed?: boolean };
  Feed: { creator: string; profile: string };
  FeedItem: { creator: string; profile: string };
};
