export default defineNuxtRouteMiddleware((to, from) => {
  const refreshToken = useRequestHeader('cookie')?.split('; ')?.find((cookie) => cookie.startsWith('refreshToken='));

  console.log(refreshToken);

  if (!refreshToken) {
    console.log('авторизуйся');
    // abortNavigation();
    // return navigateTo('/login');
  }

  if (refreshToken && to.path === '/login') {
    console.log('страничка любая, кроме авторизации');
    // return navigateTo('/tasks');
  }

  if (!refreshToken && to.path === '/login') {
    console.log('страничка авторизации');
    // return navigateTo(to.fullPath);
  }
});
