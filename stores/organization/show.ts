import { defineStore } from "pinia";
import type { Organization } from "~~/types/organization";
import { FetchItemData } from "~~/types/api";
interface State {
  retrieved?: Organization;
  isLoading: boolean;
  error?: string;
  hubUrl?: URL;
}

export const useOrganizationShowStore = defineStore("organizationShow", {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: "",
    hubUrl: undefined,
  }),

  actions: {
    setData({
      retrieved,
      isLoading,
      error,
      hubUrl,
    }: FetchItemData<Organization>) {
      this.setRetrieved(retrieved.value);
      this.setLoading(isLoading.value);
      this.setHubUrl(hubUrl.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setRetrieved(retrieved?: Organization) {
      this.retrieved = retrieved;
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl;
    },

    setError(error?: string) {
      this.error = error;
    },
  },
});
