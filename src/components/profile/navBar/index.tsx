import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { User } from 'src/interfaces/user/user';
import { useTheme } from 'src/providers/ThemeProvider';

type Props = {
  user: User;
};

const ProfileNavBar = ({ user }: Props) => {
  const { theme } = useTheme();
  if (!user) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      <Text style={styles.text}>{user.display_name || `@${user.name}`}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
