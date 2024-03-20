
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    usersData: null,
  }),
  actions: {
    async fetchUsers(organizationId = null) {

      let url = `http://localhost:8000/api/app_users`;
      if (organizationId) {
        url += `?organization=${organizationId}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const data = await response.json();
        this.usersData = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    
  },
  getters: {
    getUsersGetters: (state) => state.usersData,
   
  }
});