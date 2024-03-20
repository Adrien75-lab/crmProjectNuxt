import { defineStore } from 'pinia';

export const useReminderStore = defineStore({
    id: 'reminder',
    state: () => ({
        remindersData: null,
    }),
    actions: {
        async fetchReminders(organizationId = null) {

            let url = `http://localhost:8000/api/reminders`;
            if (organizationId) {
                url += `?organization=${organizationId}`;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch steps data');
                }
                const data = await response.json();
                this.remindersData = data;
                return data;
            } catch (error) {
                console.error(error);
            }
        },

    },
    getters: {
        getRemindersGetters: (state) => state.remindersData,
    }
});