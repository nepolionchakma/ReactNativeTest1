import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Types/Types';
interface WelcomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}
const Welcome = ({navigation}: WelcomeProps) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = () => {
    if (name === 'admin' && password === 'admin') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid credentials');
    }
  };
  return (
    <View style={styles.container}>
      <Text>WELCOME</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          onChangeText={setName}
          value={name}
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
