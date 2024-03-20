import { defineStore } from 'pinia';

export const useContactStore = defineStore({
    id: 'contact',
    state: () => ({
        contactsData: null,
    }),
    actions: {
        async fetchContacts(organizationId = null) {

            let url = `http://localhost:8000/api/contacts`;
            if (organizationId) {
                url += `?organization=${organizationId}`;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch steps data');
                }
                const data = await response.json();
                this.contactsData = data;
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        
    },
    getters: {
        getContactsGetters: (state) => state.contactsData,
       
    }
});