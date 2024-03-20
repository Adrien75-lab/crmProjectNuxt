import { defineStore } from 'pinia';

export const useStepStore = defineStore({
  id: 'step',
  state: () => ({
    stepsData: null,
  }),
  actions: {
    async fetchSteps(organizationId = null) {

      let url = `http://localhost:8000/api/steps`;
      if (organizationId) {
        url += `?organization=${organizationId}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch steps data');
        }
        const data = await response.json();
        this.stepsData = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    },

  },
  getters: {
    getStepsGetters: (state) => state.stepsData,
  }
});