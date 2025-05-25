import {Image, ImageSourcePropType, ImageStyle, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import HomeEmpty from '../../Assets/HomeEmpty.png';
import HomeFilled from '../../Assets/HomeFilled.png';
import SettingsEmpty from '../../Assets/SettingsEmpty.png';
import SettingsFilled from '../../Assets/SettingsFilled.png';
import ManageEmpty from '../../Assets/ManageEmpty.png';
import ManageFilled from '../../Assets/ManageFilled.png';
import ManageDepartment from '../ManageDepartment/ManageDepartment';

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
const HomeNavigator = () => {
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

export default HomeNavigator;

const styles = StyleSheet.create({
  iconImage: {width: 30, height: 30, marginTop: 10},
});
