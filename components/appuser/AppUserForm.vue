<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="appuser_lastName"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        lastName
      </label>
      <input
        id="appuser_lastName"
        v-model="item.lastName"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.lastName ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.lastName"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.lastName }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_firstName"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        firstName
      </label>
      <input
        id="appuser_firstName"
        v-model="item.firstName"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.firstName ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.firstName"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.firstName }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_last_login"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        last_login
      </label>
      <input
        id="appuser_last_login"
        v-model="item.last_login"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.last_login ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.last_login"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.last_login }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_created_at"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        created_at
      </label>
      <input
        id="appuser_created_at"
        v-model="item.created_at"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.created_at ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.created_at"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.created_at }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_deleted_at"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        deleted_at
      </label>
      <input
        id="appuser_deleted_at"
        v-model="item.deleted_at"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.deleted_at ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.deleted_at"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.deleted_at }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_organization"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        organization
      </label>
      <FormRepeater
        :values="item.organization"
        @update="(values: any[]) => (item.organization = values)"
      />
      <div
        v-if="violations?.organization"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.organization }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_lastLogin"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        lastLogin
      </label>
      <input
        id="appuser_lastLogin"
        v-model="item.lastLogin"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.lastLogin ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.lastLogin"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.lastLogin }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="appuser_createdAt"
        v-model="item.createdAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.createdAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.createdAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="appuser_deletedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        deletedAt
      </label>
      <input
        id="appuser_deletedAt"
        v-model="item.deletedAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.deletedAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.deletedAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.deletedAt }}
      </div>
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { AppUser } from "~~/types/appuser";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: AppUser;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<AppUser> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: AppUser): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
