import {types} from 'mobx-state-tree';

export const PlayerModel = types
  .model('PlayerModel', {
    id: types.identifierNumber,
    name: types.string,
    age: types.number,
    in: true,
  })
  .views(self => ({
    // get fullName() {
    //   return `${self.name} ${self.age}`;
    // },
    get InOrOut() {
      return self.age;
    },
    get inOrOut() {
      return self.in ? 'in' : 'out';
    },
    get inClass() {
      return self.in ? 'in' : 'out';
    },
  }))
  .actions(self => ({
    // setName(name: string) {
    //   self.name = name;
    // },
    toggleInOrOut() {
      self.in = !self.in;
    },
  }));
