export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Record: undefined;
  UploadVideo: { id?: string; source: string; sourceThumb?: string; type: string; name: string };
  Profile: { embed?: boolean };
  Feed: { currentItem: number; profile: boolean };
  FeedItem: { currentItem: number; profile: boolean };
  FeedNavigator: { currentItem: number; profile: boolean };
};
