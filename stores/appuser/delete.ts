import { defineStore } from "pinia";
import type { AppUser } from "~~/types/appuser";

interface State {
  deleted?: AppUser;
  mercureDeleted?: AppUser;
  isLoading: boolean;
  error?: string;
}

export const useAppUserDeleteStore = defineStore("appuserDelete", {
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

    setDeleted(deleted: AppUser) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: AppUser | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
