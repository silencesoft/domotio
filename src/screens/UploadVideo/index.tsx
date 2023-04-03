import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackPrams';

interface Props extends StackScreenProps<RootStackParamList, 'UploadVideo'> {}

const UploadVideoScreen = ({ route }: Props) => {
  const [description, setDescription] = useState('');
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();

  const handleSavePost = () => {
    setRequestRunning(true);
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={150}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your video"
        />
        <Image style={styles.mediaPreview} source={{ uri: route.params.source }} />
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
    width: 60,
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
