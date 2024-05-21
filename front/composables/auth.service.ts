import { type IAuthResponse, type IAuthForm } from '~/types/auth.types';
import { saveTokenStorage, removeFromStorage } from '~/utils/authToken';

const main = async (type: 'login' | 'register', data: IAuthForm) => {
  const { $AxiosClassic } = useNuxtApp();

  const response = await $AxiosClassic.post<IAuthResponse>(
    `/auth/${type}`,
    data,
  );

  if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
  return response;
};

const getNewToken = async () => {
  const { $AxiosClassic } = useNuxtApp();

  const response = await $AxiosClassic.post<IAuthResponse>(
    `/auth/login/access-token`,
  );

  if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
  return response;
};

const logout = async () => {
  const { $AxiosClassic } = useNuxtApp();

  const response = await $AxiosClassic.post<boolean>(`/auth/logout`);

  if (response.data) removeFromStorage();
  return response;
};

export { main, getNewToken, logout };
