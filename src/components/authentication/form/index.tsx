import { Feather } from '@expo/vector-icons';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { loginKeyAtom } from 'src/state/user';
// import { storage } from 'src/utils/storage';

type Props = {
  authPage: number;
  setDetailsPage: (detailsPage: boolean) => void;
};

const AuthForm = ({ authPage, setDetailsPage }: Props) => {
  const [userKey, setUserKey] = useState('');
  const setLoginKey = useSetAtom(loginKeyAtom);

  const handleLogin = () => {
    // storage.set('loginKey', data.userKey);
    setLoginKey(userKey);
  };

  const handleRegister = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        onChangeText={(text) => setUserKey(text)}
        style={styles.textInput}
        placeholder="Secret/Public Key (Hex)"
      />

      <TouchableOpacity style={styles.button} onPress={() => (authPage == 0 ? handleLogin() : handleRegister())}>
        <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textInput: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 80,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
