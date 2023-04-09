export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Record: undefined;
  UploadVideo: { source: string; sourceThumb?: string };
  Profile: { embed?: boolean };
  Feed: { currentItem: number; profile: boolean };
  FeedItem: { currentItem: number; profile: boolean };
  FeedNavigator: { currentItem: number; profile: boolean };
};
