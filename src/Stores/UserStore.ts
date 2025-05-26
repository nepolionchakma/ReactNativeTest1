import AsyncStorage from '@react-native-async-storage/async-storage';
import {flow, Instance, SnapshotIn, types} from 'mobx-state-tree';

// Define Profile Picture model with corrected spelling
const IProfilePictureType = types.model('IProfilePictureType', {
  original: types.string,
  thumbnail: types.string,
});

// Define User model
const User = types.model('User', {
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
    user: types.maybe(User), // user can be nullable initially
  })
  .actions(self => ({
    // A generator function to fetch user from AsyncStorage
    fetchUser: flow(function* () {
      try {
        const response = yield AsyncStorage.getItem('user');
        if (response) {
          const userData = JSON.parse(response);
          self.user = User.create(userData); // Create the model instance from the plain object
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    }),

    // A setter for manually updating the user, if necessary
    setUser(user: Instance<typeof User>) {
      self.user = user;
    },
  }));

export type IUserStore = typeof UserStore.Type;
