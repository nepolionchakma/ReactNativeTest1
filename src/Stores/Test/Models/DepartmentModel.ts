import {types} from 'mobx-state-tree';

export const DepartmentModel = types.model('DepartmentModel', {
  department_id: types.identifierNumber,
  department_name: types.string,
});
