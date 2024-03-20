import { defineStore } from "pinia";
import type { Reminder } from "~~/types/reminder";

interface State {
  deleted?: Reminder;
  mercureDeleted?: Reminder;
  isLoading: boolean;
  error?: string;
}

export const useReminderDeleteStore = defineStore("reminderDelete", {
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

    setDeleted(deleted: Reminder) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Reminder | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
