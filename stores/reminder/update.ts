import { defineStore } from "pinia";
import type { Reminder } from "~~/types/reminder";
import type { SubmissionErrors } from "~~/types/error";
import { FetchItemData, UpdateItemData } from "~~/types/api";

interface State {
  updated?: Reminder;
  retrieved?: Reminder;
  isLoading: boolean;
  error?: string;
  hubUrl?: URL;
  violations?: SubmissionErrors;
}

export const useReminderUpdateStore = defineStore("reminderUpdate", {
  state: (): State => ({
    updated: undefined,
    retrieved: undefined,
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Reminder>) {
      this.setRetrieved(retrieved.value);
      this.setLoading(isLoading.value);
      this.setHubUrl(hubUrl.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setUpdateData({
      updated,
      isLoading,
      error,
      violations,
    }: UpdateItemData<Reminder>) {
      this.setUpdated(updated.value);
      this.setLoading(isLoading.value);
      this.setViolations(violations.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setRetrieved(retrieved?: Reminder) {
      this.retrieved = retrieved;
    },

    setUpdated(updated?: Reminder) {
      this.updated = updated;
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl;
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setError(error?: string) {
      this.error = error;
    },

    setViolations(violations?: SubmissionErrors) {
      this.violations = violations;
    },
  },
});
