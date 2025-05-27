import React, {
  useEffect,
  // useRef
} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/Types/Types';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/Screens/Home/HomeNavigator';
import Welcome from './src/Screens/Welcome/Welcome';
import {StoreProvider, useStore} from './src/Stores/StoreProvider';
// import Help from './src/Screens/Help/Help';
// import {
//   Button,
//   DrawerLayoutAndroid,
//   Image,
//   Pressable,
//   Text,
//   View,
// } from 'react-native';

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  // const drawer = useRef<DrawerLayoutAndroid>(null);
  const {userStore} = useStore();
  // const API_URL = process.env.API_URL;
  useEffect(() => {
    userStore.fetchUser();
  }, [userStore]);

  // const navigationView = () => (
  //   <View>
  //     <Text>I'm in the Drawer!</Text>
  //     <Button
  //       title="Close drawer"
  //       onPress={() => drawer.current?.closeDrawer()}
  //     />
  //   </View>
  // );
  return (
    <StoreProvider>
      {/* <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={'right'}
        renderNavigationView={navigationView}>
        <View>
          <Image
            source={{
              uri: `${API_URL}/${userStore.user?.profile_picture.thumbnail}`,
            }}
          />
          <Text>{userStore.user?.user_name}</Text>
          <Pressable onPress={() => drawer.current?.openDrawer()}>
            <Text>Open Drawer</Text>
          </Pressable>
          <Pressable onPress={() => userStore.removeUser()}>
            <Text>Logout</Text>
          </Pressable>
        </View> */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Help"
            component={Help}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* </DrawerLayoutAndroid> */}
    </StoreProvider>
  );
};

export default App;
