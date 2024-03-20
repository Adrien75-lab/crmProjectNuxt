<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'appusers' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <button
      class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
      @click="deleteItem"
    >
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit AppUser {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading || deleteLoading"
    class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
    role="status"
  >
    Loading...
  </div>

  <div
    v-if="error || deleteError"
    class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
    role="alert"
  >
    {{ error || deleteError }}
  </div>

  <div
    v-if="created || updated"
    class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
    role="status"
  >
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/appuser/AppUserForm.vue";
import { useAppUserUpdateStore } from "~~/stores/appuser/update";
import { useAppUserCreateStore } from "~~/stores/appuser/create";
import { useAppUserDeleteStore } from "~~/stores/appuser/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { AppUser } from "~~/types/appuser";

const route = useRoute();
const router = useRouter();

const appuserCreateStore = useAppUserCreateStore();
const { created } = storeToRefs(appuserCreateStore);

const appuserDeleteStore = useAppUserDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(appuserDeleteStore);

const appuserUpdateStore = useAppUserUpdateStore();

useMercureItem({
  store: appuserUpdateStore,
  deleteStore: appuserDeleteStore,
  redirectRouteName: "appusers",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<AppUser | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<AppUser>(`app_users/${id}`);
appuserUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: AppUser) {
  if (!item?.value) {
    appuserUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<AppUser>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  appuserUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    appuserDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this appuser?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      appuserDeleteStore.setError(error.value);
      return;
    }

    appuserDeleteStore.setLoading(Boolean(isLoading?.value));
    appuserDeleteStore.setDeleted(item.value);
    appuserDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "appusers" });
    }
  }
}

onBeforeUnmount(() => {
  appuserUpdateStore.$reset();
  appuserCreateStore.$reset();
  appuserDeleteStore.$reset();
});
</script>
