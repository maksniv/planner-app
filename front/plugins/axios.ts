import axios, { type CreateAxiosDefaults } from 'axios';
import { getAccessToken, removeFromStorage } from '@/utils/auth-token';
import { errorCatch } from '@/utils/error';
import { getNewToken } from '~/composables/auth.service';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const options: CreateAxiosDefaults = {
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const AxiosClassic = axios.create(options);

  const AxiosWithAuth = axios.create(options);

  AxiosWithAuth.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config?.headers && accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });

  AxiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error?.response?.status === 401 ||
          errorCatch(error) === 'jwt expired' ||
          errorCatch(error) === 'jwt must be provided') &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          await getNewToken();
          return AxiosWithAuth.request(originalRequest);
        } catch (error) {
          if (errorCatch(error) === 'jwt expired') removeFromStorage();
        }
      }
      throw error;
    },
  );
  return {
    provide: {
      AxiosClassic,
      AxiosWithAuth,
    },
  };
});
