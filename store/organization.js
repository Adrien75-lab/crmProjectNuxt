import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore({
  id: 'organization',
  state: () => ({
    organizationData: null,
    organizationByIdData: null
  }),
  actions: {
    async fetchOrganizationData() {
      try {
        const response = await fetch('http://localhost:8000/api/organizations');

        if (!response.ok) {
          throw new Error('Failed to fetch organization data');
        }
        const data = await response.json();
        this.organizationData = data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async fetchOrganizationById(id) {
      try {
        const response = await fetch(`http://localhost:8000/api/organizations/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch organization id data');
        }
        const data = await response.json();
        console.log('Organization data by ID fetched:', data);
        this.organizationByIdData = data; // Mettre à jour les données de l'organisation par ID
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    
  },
  getters: {
    getOrganizationData: (state) => state.organizationData,
    getOrganizationByIdData: (state) => state.organizationByIdData,
   
  }
});