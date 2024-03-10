import { defineStore } from 'pinia';

export const useSideBarStore = defineStore({
  id: 'side-bar-store',
  state: () => {
    return {
      activePageTitle: '',
      openStatus: false,
    };
  },
  actions: {
    changeActivePageTitle(value: string) {
      this.activePageTitle = value;
    },
    changeOpenStatusValue() {
      this.openStatus = !this.openStatus;
      console.log(this.openStatus);
    },
  },
  getters: {
    getActivePageTitle: (state) => state.activePageTitle,
    getOpenStatus: (state) => state.openStatus,
  },
});
