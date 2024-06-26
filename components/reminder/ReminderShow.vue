<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'reminders' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'reminders-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
      >
        Edit
      </nuxt-link>
      <button
        class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
        @click="deleteItem"
      >
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Reminder {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading"
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

  <div v-if="item" class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Field
          </th>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            created_at
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.created_at) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            note
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.note }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            dueDate
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.dueDate) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            organization
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('organizations-id')">
              <nuxt-link
                v-for="organization in item.organizations"
                :key="organization"
                :to="{ name: 'organizations-id', params: { id: organization } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ organization }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="organization in item.organizations"
                :key="organization"
              >
                {{ organization }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            User
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.User }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            createdAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.createdAt) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            user
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.user }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useReminderShowStore } from "~~/stores/reminder/show";
import { useReminderDeleteStore } from "~~/stores/reminder/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Reminder } from "~~/types/reminder";

const route = useRoute();
const router = useRouter();

const reminderDeleteStore = useReminderDeleteStore();
const { error: deleteError, deleted } = storeToRefs(reminderDeleteStore);

const reminderShowStore = useReminderShowStore();

useMercureItem({
  store: reminderShowStore,
  deleteStore: reminderDeleteStore,
  redirectRouteName: "reminders",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Reminder>(`reminders/${id}`);
reminderShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    reminderDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this reminder?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      reminderDeleteStore.setError(error.value);
      return;
    }

    reminderDeleteStore.setDeleted(item.value);
    reminderDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "reminders" });
    }
  }
}

onBeforeUnmount(() => {
  reminderShowStore.$reset();
});
</script>
