import { AxiosClassic } from '@/utils/axios';
import { type IAuthResponse, type IAuthForm } from '~/types/auth.types';

export const authService = {
  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await AxiosClassic.post<IAuthResponse>(
      `/auth/${type}`,
      data,
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async getNewToken() {
    const response = await AxiosClassic.post<IAuthResponse>(
      `/auth/login/access-token`,
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async logout() {
    const response = await AxiosClassic.post<boolean>(`/auth/logout`);

    if (response.data) removeFromStorage();

    return response;
  },
};
