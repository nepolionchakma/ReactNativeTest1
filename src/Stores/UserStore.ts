import {types, flow, Instance} from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Profile Picture model
const IProfilePictureType = types.model('IProfilePictureType', {
  original: types.string,
  thumbnail: types.string,
});

// Define User model
export const User = types.model('User', {
  access_token: types.string,
  isLoggedIn: types.boolean,
  issuedAt: types.string,
  profile_picture: IProfilePictureType,
  refresh_token: types.string,
  tenant_id: types.number,
  user_id: types.identifierNumber,
  user_name: types.string,
  user_type: types.string,
});

// Define UserStore model
export const UserStore = types
  .model('UserStore', {
    user: types.maybeNull(User), // user can be nullable (either a User instance or null)
  })
  .actions(self => ({
    fetchUser: flow(function* () {
      try {
        const response = yield AsyncStorage.getItem('user');
        if (response) {
          const userData = JSON.parse(response);
          self.user = User.create(userData);
        } else {
          self.user = null;
        }
      } catch (error) {
        console.error('Failed to fetch user from AsyncStorage:', error);
        self.user = null;
      }
    }),

    setUser(userData: any) {
      self.user = User.create(userData);
    },

    removeUser: flow(function* () {
      try {
        yield AsyncStorage.removeItem('user');
      } catch (error) {
        console.error('Failed to remove user from storage:', error);
      }
      self.user = null;
    }),
  }));

export type IUserStore = Instance<typeof UserStore>;
