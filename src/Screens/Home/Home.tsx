import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUserType} from '../../Types/Types';

const Home = () => {
  const [user, setUser] = useState<IUserType>();
  useEffect(() => {
    (async () => {
      try {
        const res = JSON.parse((await AsyncStorage.getItem('user')) ?? '');
        setUser(res);
        // console.log(user, 'user');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const logout = () => {};
  return (
    <View style={{flex: 1, padding: 10}}>
      <Text>Home</Text>
      <Text>{user?.user_name}</Text>
      <>
        <Pressable onPress={logout} style={styles.logoutBtn}>
          <Text style={{color: 'white'}}>Logout</Text>
        </Pressable>
      </>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, fontWeight: 'bold'},
  logoutBtn: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
});
