import { AxiosWithAuth } from '~/plugins/axios';
import type { IUser, TypeUserForm } from '~/types/auth.types';

export interface IProfileResponse {
  user: IUser;
  statistics: {
    label: String;
    value: String;
  }[];
}

class UserService {
  private BASE_URL = '/user/profile';
  async getProfile() {
    const response = await AxiosWithAuth.get<IProfileResponse>(this.BASE_URL);
    return response.data;
  }

  async update(data: TypeUserForm) {
    const response = await AxiosWithAuth.put<IProfileResponse>(
      this.BASE_URL,
      data,
    );
    return response.data;
  }
}
export const userService = new UserService();
