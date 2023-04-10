import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from 'src/constants/rootStackParams';

type Props = {};

type recordScreenProp = StackNavigationProp<RootStackParamList, 'Record'>;

const RecordScreen = (props: Props) => {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState<Asset[]>([]);

  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraFlash, setCameraFlash] = useState(FlashMode.off);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation<recordScreenProp>();

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480'] };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
	  const type = '';
	  const name = source.substring(source.lastIndexOf('/') + 1);
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate('UploadVideo', { source, sourceThumb, type, name });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const type = result.assets[0].type;
      const name = uri.substring(uri.lastIndexOf('/') + 1);
      console.log(result.assets[0], name);
      let sourceThumb = await generateThumbnail(uri);
      navigation.navigate('UploadVideo', { source: uri, sourceThumb, type, name });
    }
  };

  const generateThumbnail = async (source: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === 'granted');

      if (galleryStatus.status === 'granted' && Platform.OS !== 'web') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={'16:9'}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)}
        >
          <Feather name="refresh-ccw" size={24} color={'white'} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setCameraFlash(cameraFlash === FlashMode.off ? FlashMode.torch : FlashMode.off)}
        >
          <Feather name="zap" size={24} color={'white'} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => pickFromGallery()} style={styles.galleryButton}>
            {galleryItems[0] === undefined ? (
              <></>
            ) : (
              <Image style={styles.galleryButtonImage} source={{ uri: galleryItems[0].uri }} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  camera: {
    flex: 1,
    backgroundColor: 'black',
    aspectRatio: 9 / 16,
  },
  bottomBarContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginBottom: 120,
    width: '100%',
  },
  recordButtonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  recordButton: {
    borderWidth: 8,
    borderColor: '#ff404087',
    backgroundColor: '#ff4040',
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  sideBarContainer: {
    top: 60,
    right: 0,
    marginHorizontal: 20,
    position: 'absolute',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
});
