<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="reminder_created_at"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        created_at
      </label>
      <input
        id="reminder_created_at"
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
        for="reminder_note"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        note
      </label>
      <input
        id="reminder_note"
        v-model="item.note"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.note ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.note"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.note }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="reminder_dueDate"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        dueDate
      </label>
      <input
        id="reminder_dueDate"
        v-model="item.dueDate"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.dueDate ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.dueDate"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.dueDate }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="reminder_organization"
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
        for="reminder_User"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        User
      </label>
      <input
        id="reminder_User"
        v-model="item.User"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.User ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.User"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.User }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="reminder_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="reminder_createdAt"
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
        for="reminder_user"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        user
      </label>
      <input
        id="reminder_user"
        v-model="item.user"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.user ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.user"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.user }}
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
import type { Reminder } from "~~/types/reminder";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Reminder;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Reminder> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Reminder): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
