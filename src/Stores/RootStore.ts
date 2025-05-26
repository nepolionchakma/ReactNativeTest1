import {types} from 'mobx-state-tree';
// import {CounterStore} from './CounterStore';
// import {ProductStore} from './ProductStore';
// import {StudentStore} from './StudentStore';
import {DepartmentStore} from './DepartmentStore';
import {UserStore} from './UserStore';

export const RootStore = types.model('RootStore', {
  departmentStore: DepartmentStore,
  userStore: UserStore,
  // counterStore: CounterStore,
  // productStore: ProductStore,
  // studentStore: StudentStore,
});

export const rootStore = RootStore.create({
  departmentStore: {departments: []},

  userStore: {
    user: {
      user_name: '',
      user_id: 0,
      tenant_id: 0,
      user_type: '',
      isLoggedIn: false,
      access_token: '',
      issuedAt: '',
      refresh_token: '',
      profile_picture: {original: '', thumbnail: ''},
    },
  },
  // counterStore: {count: 0},
  // productStore: {
  //   products: [],
  // },
  // studentStore: {
  //   students: [],
  // },
});

export type IRootStore = typeof RootStore.Type;
