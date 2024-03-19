import { defineStore } from 'pinia';

export const useLoaderStore = defineStore({
  id: 'loader-store',
  state: () => {
    return {
      isShow: false,
    };
  },
  actions: {
    set(value: boolean) {
      this.isShow = value;
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
  },
  getters: {
    getStatus: (state) => state.isShow,
  },
});
