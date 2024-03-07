import { defineStore } from 'pinia';

export const useSideBarStore = defineStore({
  id: 'side-bar-store',
  state: () => {
    return {
      activePageTitle: 'test',
      openStatus: false,
    };
  },
  actions: {
    changeActivePageTitle(value) {
      this.activePageTitle = value;
    },
    changeOpenStatusValue() {
      this.openStatus = !this.openStatus;
    },
  },
  getters: {
    getActivePageTitle: (state) => state.activePageTitle,
    getOpenStatus: (state) => state.openStatus,
  },
});
