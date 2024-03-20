import { defineStore } from "pinia";
import type { Organization } from "~~/types/organization";

interface State {
  deleted?: Organization;
  mercureDeleted?: Organization;
  isLoading: boolean;
  error?: string;
}

export const useOrganizationDeleteStore = defineStore("organizationDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setDeleted(deleted: Organization) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Organization | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
