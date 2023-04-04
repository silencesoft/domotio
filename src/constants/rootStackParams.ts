export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Record: undefined;
  UploadVideo: { source: string; sourceThumb?: string };
  Profile: { id?: string };
  Feed: { setCurrentUserProfileItemInView: () => void; creator: string; profile: string };
};
