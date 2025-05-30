import {flow, Instance, types} from 'mobx-state-tree';
import {DepartmentModel} from './Models/DepartmentModel';
import axios from 'axios';
const API_URL = process.env.API_URL;

export const RootStore = types
  .model('RootStore', {
    departments: types.array(DepartmentModel),
    isLoading: types.optional(types.boolean, true),
  })
  .actions(self => ({
    fetchDepartments: flow(function* () {
      try {
        const response = yield axios.get(`${API_URL}/test/departments`);

        self.departments.replace(response.data);
      } catch (error) {
        console.error('Failed to fetch departments', error);
      } finally {
        self.isLoading = false;
      }
    }),
    setDepartment(department: Instance<typeof DepartmentModel>) {
      self.departments.push(department);
    },
  }));
type IRootStore = Instance<typeof RootStore>;
let rootStore: IRootStore;
export const useRootStore = () => {
  if (!rootStore) {
    rootStore = RootStore.create({
      departments: [],
    });
  }
  return rootStore;
};
