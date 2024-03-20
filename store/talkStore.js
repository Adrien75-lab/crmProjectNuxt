import { defineStore } from 'pinia';

export const useTalkStore = defineStore({
  id: 'talk',
  state: () => ({
    talksData: null,
  }),
  actions: {
    async fetchTalks(organizationId) {
      try {
        const response = await fetch(`http://localhost:8000/api/talks?organization=${organizationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch talks data');
        }
        const data = await response.json();
        this.talksData = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    }

  },
  getters: {
    getTalks: (state) => state.talksData,
  }
});