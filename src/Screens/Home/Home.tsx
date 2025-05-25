import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  useEffect(() => {
    (async () => {
      const user = JSON.parse((await AsyncStorage.getItem('user')) ?? '');
      console.log(user, 'user');
    })();
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
