import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useStore} from '../../Stores/StoreProvider';

const Home = () => {
  const {userStore} = useStore();
  const API_URL = process.env.API_URL;
  useEffect(() => {
    userStore.fetchUser();
  }, [userStore]);

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={{
            uri: `${API_URL}/${userStore.user?.profile_picture.thumbnail}`,
          }}
          style={styles.profileImage}
        />
        <Text>{userStore.user?.user_name}</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  profileInfo: {alignItems: 'center'},
  profileImage: {width: 100, height: 100, borderRadius: 50},
});
