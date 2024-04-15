import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    theme: 'colored',
    type: 'success',
    position: 'bottom-left',
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    transition: 'slide',
  });

  return {
    provide: { toast },
  };
});
