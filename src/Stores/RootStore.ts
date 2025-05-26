import {types} from 'mobx-state-tree';
// import {CounterStore} from './CounterStore';
// import {ProductStore} from './ProductStore';
// import {StudentStore} from './StudentStore';
import {DepartmentStore} from './DepartmentStore';

export const RootStore = types.model('RootStore', {
  departmentStore: DepartmentStore,
  // counterStore: CounterStore,
  // productStore: ProductStore,
  // studentStore: StudentStore,
});

export const rootStore = RootStore.create({
  departmentStore: {departments: []},
  // counterStore: {count: 0},
  // productStore: {
  //   products: [],
  // },
  // studentStore: {
  //   students: [],
  // },
});

export type IRootStore = typeof RootStore.Type;
