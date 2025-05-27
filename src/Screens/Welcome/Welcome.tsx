import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Types/Types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from '../../Stores/StoreProvider';

interface WelcomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
}
const Welcome = ({navigation}: WelcomeProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  // console.log(process.env.API_URL, 'API_URL');
  const {userStore} = useStore();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }

    try {
      const API_URL = process.env.API_URL || 'https://your-fallback-url.com';
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (res.data) {
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        userStore.setUser(res.data);
        if (res.data.access_token) {
          navigation.replace('HomeScreen');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Invalid credentials or network error');
    }
  };

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData) {
          const user = JSON.parse(userData);
          if (user?.access_token) {
            userStore.setUser(user); // update store
            navigation.replace('HomeScreen'); // go to home screen
          }
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    };

    checkUserLogin();
  }, [navigation, userStore]);

  // console.log(userStore.user, 'userStore.user');
  return (
    <View style={styles.container}>
      <Text>WELCOME</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10},
  formContainer: {gap: 10},
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginBtn: {
    height: 40,
    width: 200,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {color: 'white', fontWeight: 'bold'},
});
