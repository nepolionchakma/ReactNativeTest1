import axios from 'axios';
import {types, SnapshotIn, flow} from 'mobx-state-tree';
const API_URL = process.env.API_URL;
// console.log(API_URL, 'API_URL');

// Department model
const Department = types.model('Department', {
  department_id: types.identifierNumber,
  department_name: types.string,
});

// Department store
export const DepartmentStore = types
  .model('DepartmentStore', {
    departments: types.array(Department),
    isLoading: types.optional(types.boolean, true),
  })
  .actions(self => ({
    addDepartment(department: SnapshotIn<typeof Department>) {
      self.departments.push(department);
    },
    fetchDepartments: flow(function* () {
      try {
        const response = yield axios.get(`${API_URL}/test/departments`);
        console.log(response.data, 'response');

        // Directly replace the departments array
        self.departments.replace(response.data);
      } catch (error) {
        console.error('Failed to fetch departments', error);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

export type IDepartmentStore = typeof DepartmentStore.Type;
// Student model
// const Student = types.model('Student', {
//   id: types.identifierNumber,
//   name: types.string,
//   age: types.number,
//   subjects: types.array(types.string),
// });

// Student store
// export const StudentStore = types
//   .model('StudentStore', {
//     students: types.array(Student),
//   })
//   .actions(self => ({
//     addStudent(student: SnapshotIn<typeof Student>) {
//       self.students.push(student);
//     },
//   }));

// export type IStudentStore = typeof StudentStore.Type;
