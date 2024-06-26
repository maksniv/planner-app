import Cookies from 'js-cookie';

enum EnumToken {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumToken.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumToken.ACCESS_TOKEN, accessToken, {
    domain: process.env.BASE_URL,
    sameSite: 'strict',
    expires: new Date(new Date().getTime() + 15 * 60 * 1000),
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumToken.ACCESS_TOKEN);
};
