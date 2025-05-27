import React, {useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import ManageDepartment from '../ManageDepartment/ManageDepartment';
import {useStore} from '../../Stores/StoreProvider';

// Icons
import HomeEmpty from '../../Assets/HomeEmpty.png';
import HomeFilled from '../../Assets/HomeFilled.png';
import SettingsEmpty from '../../Assets/SettingsEmpty.png';
import SettingsFilled from '../../Assets/SettingsFilled.png';
import ManageEmpty from '../../Assets/ManageEmpty.png';
import ManageFilled from '../../Assets/ManageFilled.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Help from '../Help/Help';

type TabIconProps = {
  focused: boolean;
  filledIcon: ImageSourcePropType;
  emptyIcon: ImageSourcePropType;
  style?: ImageStyle;
};

const TabIcon: React.FC<TabIconProps> = ({
  focused,
  filledIcon,
  emptyIcon,
  style,
}) => <Image source={focused ? filledIcon : emptyIcon} style={style} />;

const CustomDrawerContent = ({navigation}: any) => {
  const {userStore} = useStore();
  const API_URL = process.env.API_URL || 'https://example.com';

  useEffect(() => {
    userStore.fetchUser();
  }, [userStore]);

  const profilePicUri = userStore.user?.profile_picture?.thumbnail
    ? `${API_URL}/${userStore.user.profile_picture.thumbnail}`
    : undefined;

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.profileContainer}>
        {profilePicUri && (
          <Image source={{uri: profilePicUri}} style={styles.profilePic} />
        )}
        <Text style={styles.userName}>
          {userStore.user?.user_name || 'Guest'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home', {screen: 'HomeScreen'})}>
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          navigation.navigate('Home', {screen: 'ManageDepartment'})
        }>
        <Text style={styles.drawerItemText}>Manage Department</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home', {screen: 'Help'})}>
        <Text style={styles.drawerItemText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          await AsyncStorage.removeItem('user'); // Clear stored user
          userStore.removeUser(); // Clear MobX store

          // Reset navigation to Welcome screen
          navigation.reset({
            index: 0,
            routes: [{name: 'Welcome'}],
          });
        }}>
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon
            focused={focused}
            filledIcon={HomeFilled}
            emptyIcon={HomeEmpty}
            style={styles.iconImage}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ManageDepartment"
      component={ManageDepartment}
      options={{
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon
            focused={focused}
            filledIcon={ManageFilled}
            emptyIcon={ManageEmpty}
            style={styles.iconImage}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Help"
      component={Help}
      options={{
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon
            focused={focused}
            filledIcon={SettingsFilled}
            emptyIcon={SettingsEmpty}
            style={styles.iconImage}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={BottomNavigator} />
  </Drawer.Navigator>
);

export default HomeNavigator;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drawerItem: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  drawerItemText: {
    fontSize: 16,
  },
  iconImage: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});
