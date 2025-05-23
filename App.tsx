import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/Types/Types';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/Screens/Home/HomeNavigator';
import Welcome from './src/Screens/Welcome/Welcome';

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
