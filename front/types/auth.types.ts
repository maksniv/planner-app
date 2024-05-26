export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email?: string;
  password: string;
}

export type TypeUserForm = {
  name: string;
  surname: string;
  email?: string;
  password?: string;
};
