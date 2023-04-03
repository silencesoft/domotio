import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { User } from 'src/interfaces/user/user';
import { pubKeyAtom } from 'src/state/user';

type Props = {
  user: User;
};

const ProfileHeader = ({ user }: Props) => {
  const navigation = useNavigation();
  const currentUser = useAtomValue(pubKeyAtom);

  const isFollowing = true; // useFollowing(firebase.auth().currentUser.uid, user.uid).data;
  // const isFollowingMutation = useFollowingMutation();

  const renderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedButton}
            onPress={() => navigation.navigate('chatSingle', { contactId: user.uid })}
          >
            <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedIconButton}
            onPress={
              () => {}
              // isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })
            }
          >
            <Feather name="user-check" size={20} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={buttonStyles.filledButton}
          onPress={
            () => {}
            // isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })
          }
        >
          <Text style={buttonStyles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon={'account'} />
      <Text style={styles.emailText}>{user.username}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      {currentUser === user.uid ? (
        <TouchableOpacity style={buttonStyles.grayOutlinedButton} onPress={() => navigation.navigate('editProfile')}>
          <Text style={buttonStyles.grayOutlinedButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        renderFollowButton()
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 65,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  counterContainer: {
    paddingBottom: 20,
    flexDirection: 'row',
  },
  counterItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emailText: {
    padding: 20,
  },
  counterNumberText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  counterLabelText: {
    color: 'gray',
    fontSize: 11,
  },
});

const buttonStyles = StyleSheet.create({
  grayOutlinedButton: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  grayOutlinedIconButton: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  filledButton: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#ff4040',
  },
  filledButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  grayOutlinedButtonText: {
    color: 'black',
    fontWeight: '700',
  },
});
