import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthForm from 'src/components/authentication/form';
import AuthMenu from 'src/components/authentication/menu';

type Props = {};

const LoginScreen = (props: Props) => {
  const [authPage, setAuthPage] = useState(0);
  const [detailsPage, setDetailsPage] = useState(false);

  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthForm authPage={authPage} setDetailsPage={setDetailsPage} />
      ) : (
        <AuthMenu authPage={authPage} setAuthPage={setAuthPage} setDetailsPage={setDetailsPage} />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
