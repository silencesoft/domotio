import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ResizeMode, Video } from 'expo-av';
import { useAtomValue } from 'jotai';
import * as mime from 'mime';
import { dateToUnix, useNostr } from 'nostr-react';
import { Event as NostrEvent, getEventHash, signEvent, verifySignature } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import { NostrKind } from 'src/constants/nostr';

import { RootStackParamList } from 'src/constants/rootStackParams';
import { saveMedia } from 'src/services/saveMedia';
import { loginKeyAtom, pubKeyAtom } from 'src/state/user';
import { generateThumbnail } from 'src/utils/generateThumbnail';

interface Props extends StackScreenProps<RootStackParamList, 'UploadVideo'> {}

const UploadVideoScreen = ({ route }: Props) => {
  const [description, setDescription] = useState('');
  const [externalSource, setExternalSource] = useState('');
  const [externalSourceThumb, setExternalSourceThumb] = useState('');
  const [tags, setTags] = useState('');
  const [requestRunning, setRequestRunning] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const id = route?.params?.id;
  const source = route?.params?.source;

  const [play, setPlay] = useState(false);
  const pubkey = useAtomValue(pubKeyAtom);
  const loginKey = useAtomValue(loginKeyAtom);
  const { publish } = useNostr();

  const handleSavePost = async () => {
    setRequestRunning(true);
    let video = [];
    let image = [];

    if (source) {
      video = await saveMedia(route.params.source, mime.getType(route.params.source) || '', route.params.name);
      image = route?.params?.sourceThumb
        ? await saveMedia(
            route.params.sourceThumb || '',
            mime.getType(route.params.sourceThumb) || '',
            'screenshot.jpg'
          )
        : [];
    } else {
      video.push(externalSource);
      image = externalSourceThumb
        ? await saveMedia(externalSourceThumb || '', mime.getType(externalSourceThumb) || '', 'screenshot.jpg')
        : [];
    }

    if (!image[0] && !video[0]) {
      setRequestRunning(false);
      return;
    }

    const now = new Date();
    const tagsList = tags.split(',');
    const date = dateToUnix(now);
    let content = description;

    const event: NostrEvent = {
      content: content,
      kind: NostrKind.ShortVideo,
      created_at: date,
      pubkey: pubkey || '',
      id: '',
      sig: '',
      tags: [
        ['image', image[0] || ''],
        ['published_at', id ? /* posts[0].published_at.toString() */ '' : date.toString()],
      ],
    };

    tagsList.forEach((tag: string) => {
      event.tags.push(['t', tag.trim()]);
    });

    event.tags.push(['r', video[0], mime.getType(video[0]) || '']);

    const profiles = content.match(/@npub\w+/gi);

    const newTags: any = [];

    profiles?.forEach((profile) => {
      const user = profile.replace('@', '');

      content = content.replace(profile, `nostr:${user}`);
    });

    if (profiles?.length) {
      event.content = content;
      event.tags = [...event.tags, ...newTags];
    }

    try {
      event.id = getEventHash(event);
      event.sig = signEvent(event, loginKey);

      publish(event);

      const ok = verifySignature(event);

      if (ok) {
        setRequestRunning(false);
        navigation.navigate('Profile');
      } else {
        // setError('title', { message: 'Error in server' });
        setRequestRunning(false);
      }
    } catch (e) {
      console.log({ e });
      setRequestRunning(false);
      // setError('title', { message: 'Error in server or event signature' });
    }
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  const onToggleSnackBar = () => setError('');

  const onDismissSnackBar = () => setError('');

  const isVideoByURL = (url: string) => {
    if (!url) return false;

    const filename = url?.split('/').pop().split('#')[0].split('?')[0];

    if (filename) {
      const ext = filename.split('.').pop();
      const mimeType = mime.getType(ext);

      if (!mimeType) return false;

      return mimeType?.startsWith('video');
    }

    return false;
  };

  useEffect(() => {
    const createThumb = async () => {
      try {
        const sourceThumb = await generateThumbnail(externalSource);

        if (sourceThumb) {
          setExternalSourceThumb(sourceThumb);
        }
      } catch (e: unknown) {
        if (typeof e === 'string') {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    if (externalSource && isVideoByURL(externalSource)) {
      createThumb();
    }
  }, [externalSource]);

  return (
    <View style={styles.container}>
      {!source && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            onChangeText={(text) => setExternalSource(text)}
            placeholder="External Source"
          />
        </View>
      )}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={150}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your video"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setTags(text)}
          placeholder="Tags, comma separated"
        />
      </View>
      <View>
        {(!!source || !!externalSource) && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setPlay(!play)}>
            {play ? (
              <Video
                style={styles.mediaPreview}
                resizeMode={ResizeMode.COVER}
                shouldPlay={true}
                isLooping
                usePoster
                posterSource={{ uri: route.params.source || externalSource }}
                posterStyle={{ resizeMode: 'cover', height: '100%' }}
                source={{ uri: route.params.source || externalSource }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                videoStyle={{
                  height: '100%',
                  width: 'auto',
                  marginTop: 0,
                  marginLeft: 'auto',
                  marginBottom: 0,
                  marginRight: 'auto',
                }}
              />
            ) : (
              <>
                {!!route.params.sourceThumb || !!externalSourceThumb ? (
                  <Image
                    style={styles.mediaPreview}
                    source={{ uri: route.params.sourceThumb || externalSourceThumb }}
                  />
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Feather name="alert-circle" size={48} color="black" />
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSavePost()} style={styles.postButton}>
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {!!error && (
        <Snackbar
          visible={!!error}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          {error}
        </Snackbar>
      )}
    </View>
  );
};

export default UploadVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  uploadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: 'black',
    width: 200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  postButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ff4040',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  cancelButtonText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
