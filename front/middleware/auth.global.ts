export default defineNuxtRouteMiddleware((to, from) => {
  // const accessToken = useCookie('accessToken');

  // if (!accessToken.value) {
  //   console.log('авторизуйся');
  //   abortNavigation();
  //   return navigateTo('/login');
  // }

  // if (accessToken.value && to.path === '/login') {
  //   console.log('страничка любая, кроме авторизации');
  //   return navigateTo('/');
  // }

  // if (to.path === '/login') {
  //   console.log('страничка авторизации');
  //   return navigateTo(to.fullPath);
  // }
  // console.log(from);
  // console.log(to);
});
