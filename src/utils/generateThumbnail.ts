import * as VideoThumbnails from 'expo-video-thumbnails';

export const generateThumbnail = async (source: string) => {
  if (!source) return;

  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
      time: 5000,
    });
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

