import { defineStore } from 'pinia';

export const useTasksStore = defineStore({
  id: 'tasks-store',
  state: () => {
    return {
      search: '',
      groupId: null as string | null,
    };
  },
  actions: {
    changeSearch(value: string) {
      this.search = value;
    },
    changeGroupId(value: string | null) {
      this.groupId = value;
    },
  },
  getters: {
    getSearch: (state) => state.search,
    getGroupId: (state) => state.groupId,
  },
});
