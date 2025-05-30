import {types} from 'mobx-state-tree';
// Define Profile Picture model
const IProfilePictureType = types.model('IProfilePictureType', {
  original: types.string,
  thumbnail: types.string,
});
export const UserModel = types.model('UserModel', {
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

export type IUserModel = typeof UserModel.Type;
