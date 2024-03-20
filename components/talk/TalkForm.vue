<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="talk_datetime"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        datetime
      </label>
      <input
        id="talk_datetime"
        v-model="item.datetime"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.datetime ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.datetime"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.datetime }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="talk_note"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        note
      </label>
      <input
        id="talk_note"
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
        for="talk_organization"
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
        for="talk_user"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        user
      </label>
      <FormRepeater
        :values="item.user"
        @update="(values: any[]) => (item.user = values)"
      />
      <div
        v-if="violations?.user"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.user }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="talk_talks"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        talks
      </label>
      <FormRepeater
        :values="item.talks"
        @update="(values: any[]) => (item.talks = values)"
      />
      <div
        v-if="violations?.talks"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.talks }}
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
import type { Talk } from "~~/types/talk";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Talk;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Talk> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Talk): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
