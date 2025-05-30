import {flow, Instance, types} from 'mobx-state-tree';
import {PlayerModel} from './PlayerModel';
import {UserModel} from './UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RootStore = types
  .model('RootStore', {
    players: types.array(PlayerModel),
    drinksPlayer: types.maybe(types.reference(PlayerModel)),
    user: types.maybe(UserModel),
  })
  .actions(store => ({
    addPlayer(
      id: number,
      name: string,
      age: number,
      // player: Instance<typeof PlayerModel>
    ) {
      // store.Players.push(player);
      store.players.push({id, name, age});
    },
    setPlayer(player: Instance<typeof PlayerModel>) {
      store.drinksPlayer = player;
    },
    fetchUser: flow(function* () {
      try {
        const response = yield AsyncStorage.getItem('user');
        if (response) {
          const userData = JSON.parse(response);
          store.user = UserModel.create(userData);
        } else {
          store.user = undefined;
        }
      } catch (error) {
        console.error('Failed to fetch user from AsyncStorage:', error);
        store.user = undefined;
      }
    }),
    setUser(userData: any) {
      store.user = UserModel.create(userData);
    },

    removeUser: flow(function* () {
      try {
        yield AsyncStorage.removeItem('user');
      } catch (error) {
        console.error('Failed to remove user from storage:', error);
      }
      store.user = undefined;
    }),
  }));

export type IRootStore = Instance<typeof RootStore>;
let rootStore: IRootStore;
export function userStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      players: [
        {
          id: 1,
          name: 'John Doe',
          age: 30,
          in: true,
        },
        {
          id: 2,
          name: 'Jane Doe',
          age: 25,
          in: true,
        },
      ],
      user: undefined,
    });
  }
  return rootStore;
}
