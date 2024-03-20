<template>
  <nuxt-link :to="{ name: 'talks' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Talk</h1>

  <div
    v-if="isLoading"
    class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
    role="status"
  >
    Loading...
  </div>

  <div
    v-if="error"
    class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
    role="alert"
  >
    {{ error }}
  </div>

  <Form :errors="violations" @submit="create" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/talk/TalkForm.vue";
import { useTalkCreateStore } from "~~/stores/talk/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Talk } from "~~/types/talk";

const talkCreateStore = useTalkCreateStore();
const { created, isLoading, violations, error } = storeToRefs(talkCreateStore);

async function create(item: Talk) {
  const data = await useCreateItem<Talk>("talks", item);
  talkCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    talkCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "talks-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  talkCreateStore.$reset();
});
</script>
