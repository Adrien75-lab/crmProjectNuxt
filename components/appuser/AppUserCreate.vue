<template>
  <nuxt-link :to="{ name: 'appusers' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create AppUser</h1>

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
import Form from "~~/components/appuser/AppUserForm.vue";
import { useAppUserCreateStore } from "~~/stores/appuser/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { AppUser } from "~~/types/appuser";

const appuserCreateStore = useAppUserCreateStore();
const { created, isLoading, violations, error } = storeToRefs(appuserCreateStore);

async function create(item: AppUser) {
  const data = await useCreateItem<AppUser>("app_users", item);
  appuserCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    appuserCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "appusers-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  appuserCreateStore.$reset();
});
</script>
