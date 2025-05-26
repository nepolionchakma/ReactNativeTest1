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

interface WelcomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}
const Welcome = ({navigation}: WelcomeProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  // console.log(process.env.API_URL, 'API_URL');
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.API_URL}/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.access_token) {
        navigation.navigate('Home');
      }
      // console.log(res.data, 'res');
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid credentials');
    }
  };
  useEffect(() => {
    (async () => {
      const user = JSON.parse((await AsyncStorage.getItem('user')) ?? '');
      // console.log(user, 'user');
      if (user?.access_token) {
        navigation.navigate('Home');
      }
    })();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>WELCOME</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Name"
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
