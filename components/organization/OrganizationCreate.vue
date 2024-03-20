<template>
  <nuxt-link :to="{ name: 'organizations' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Organization</h1>

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
import Form from "~~/components/organization/OrganizationForm.vue";
import { useOrganizationCreateStore } from "~~/stores/organization/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Organization } from "~~/types/organization";

const organizationCreateStore = useOrganizationCreateStore();
const { created, isLoading, violations, error } = storeToRefs(organizationCreateStore);

async function create(item: Organization) {
  const data = await useCreateItem<Organization>("organizations", item);
  organizationCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    organizationCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "organizations-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  organizationCreateStore.$reset();
});
</script>
