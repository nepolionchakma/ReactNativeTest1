import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import HomeEmpty from '../../Assets/HomeEmpty.png';
import HomeFilled from '../../Assets/HomeFilled.png';
import SettingsEmpty from '../../Assets/SettingsEmpty.png';
import SettingsFilled from '../../Assets/SettingsFilled.png';
import ManageEmpty from '../../Assets/ManageEmpty.png';
import ManageFilled from '../../Assets/ManageFilled.png';
import ManageDepartment from '../ManageDepartment/ManageDepartment';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {IUserType} from '../../Types/Types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from '../../Stores/StoreProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Custom Drawer Content Component
const CustomDrawerContent = ({navigation}: any) => {
  const {userStore} = useStore();
  const API_URL = process.env.API_URL;
  useEffect(() => {
    userStore.fetchUser();
  }, [userStore]);

  // const [user, setUser] = useState<IUserType>();
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = JSON.parse((await AsyncStorage.getItem('user')) ?? '');
  //       setUser(res);
  //       // console.log(user, 'user');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <View style={styles.drawerContainer}>
      {/* User Profile */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: `${API_URL}/${userStore.user?.profile_picture.thumbnail}`,
          }}
          style={styles.profilePic}
        />
        <Text style={styles.userName}>{userStore.user?.user_name}</Text>
      </View>

      {/* Drawer Items */}

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.drawerItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Manage')}>
        <Text style={styles.drawerItemText}>Manage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Help')}>
        <Text style={styles.drawerItemText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          // Alert.alert('Logout')
          AsyncStorage.removeItem('user')
        }>
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
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
        name="Settings"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
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
      <Tab.Screen
        name="Manage"
        component={ManageDepartment}
        options={{
          headerShown: false,
          tabBarLabel: '',
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
    </Tab.Navigator>
  );
};
const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen
      name="Home"
      component={BottomNavigator}
      options={{drawerLabel: 'Home'}} // You can change the drawer label here
    />
    <Drawer.Screen
      name="Settings"
      component={ManageDepartment} // Settings Screen
      options={{drawerLabel: 'Settings'}}
    />
    <Drawer.Screen
      name="Manage"
      component={ManageDepartment} // Manage Screen
      options={{drawerLabel: 'Manage'}}
    />
    <Drawer.Screen
      name="Help"
      component={ManageDepartment} // Help Screen
      options={{drawerLabel: 'Help'}}
    />
    <Drawer.Screen
      name="Profile"
      component={ManageDepartment} // Profile Screen
      options={{drawerLabel: 'Profile'}}
    />
    {/* Add other screens to the Drawer Navigator as needed */}
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
