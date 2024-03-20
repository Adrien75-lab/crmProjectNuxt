import { defineStore } from "pinia";
import type { Talk } from "~~/types/talk";

interface State {
  deleted?: Talk;
  mercureDeleted?: Talk;
  isLoading: boolean;
  error?: string;
}

export const useTalkDeleteStore = defineStore("talkDelete", {
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

    setDeleted(deleted: Talk) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Talk | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
