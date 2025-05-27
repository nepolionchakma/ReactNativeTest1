export type RootStackParamList = {
  Welcome: undefined;
  HomeScreen: undefined;
  Help: undefined;
};
export interface IDepartmentsType {
  department_id: number;
  department_name: string;
}
export interface IUserType {
  access_token: string;
  isLoggedIn: boolean;
  issuedAt: string;
  profile_picture: IProfiePitureType;
  refresh_token: string;
  tenant_id: number;
  user_id: number;
  user_name: string;
  user_type: string;
}

export interface IProfiePitureType {
  original: string;
  thumbnail: string;
}
