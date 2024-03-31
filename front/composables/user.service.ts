import type { IUser, TypeUserForm } from '~/types/auth.types';

export interface IProfileResponse {
  user: IUser;
}

const BASE_URL = '/user/profile';

const getProfile = async () => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.get<IProfileResponse>(BASE_URL);
  return response.data;
};

const updateProfile = async (data: TypeUserForm) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.put<IProfileResponse>(BASE_URL, data);
  return response.data;
};

export { getProfile, updateProfile };
