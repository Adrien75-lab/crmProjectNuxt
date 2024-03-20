import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      const response = await fetch('http://localhost:8000/api/login_check', { email, password });

      if (response.ok) {
        const data = await response.json();

        this.token = data.token;
        this.user = data.user;
        this.router.push('http://localhost:8000/api/pageProspect');
      } else {

        const error = await response.json();
        alert(error.message);
      }
    },
    async logout() {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (response.ok) {
        this.token = null;
        this.user = null;
        this.router.push('/pageProspect');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    },
  },
});