<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="organization_name"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        name
      </label>
      <input
        id="organization_name"
        v-model="item.name"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.name ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.name"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.name }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="organization_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="organization_status"
        v-model="item.status"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.status ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.status"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="organization_referent_name"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        referent_name
      </label>
      <input
        id="organization_referent_name"
        v-model="item.referent_name"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.referent_name ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.referent_name"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.referent_name }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="organization_referent_function"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        referent_function
      </label>
      <input
        id="organization_referent_function"
        v-model="item.referent_function"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.referent_function ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.referent_function"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.referent_function }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="organization_referentName"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        referentName
      </label>
      <input
        id="organization_referentName"
        v-model="item.referentName"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.referentName ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.referentName"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.referentName }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="organization_referentFunction"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        referentFunction
      </label>
      <input
        id="organization_referentFunction"
        v-model="item.referentFunction"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.referentFunction ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.referentFunction"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.referentFunction }}
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
import type { Organization } from "~~/types/organization";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Organization;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Organization> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Organization): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
