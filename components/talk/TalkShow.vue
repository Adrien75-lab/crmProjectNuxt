<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'talks' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'talks-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Talk {{ item?.["@id"] }}</h1>

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
            datetime
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.datetime) }}
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
            user
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('talks-id')">
              <nuxt-link
                v-for="talk in item.talks"
                :key="talk"
                :to="{ name: 'talks-id', params: { id: talk } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ talk }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="talk in item.talks"
                :key="talk"
              >
                {{ talk }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            talks
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('talks-id')">
              <nuxt-link
                v-for="talk in item.talks"
                :key="talk"
                :to="{ name: 'talks-id', params: { id: talk } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ talk }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="talk in item.talks"
                :key="talk"
              >
                {{ talk }}
              </p>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTalkShowStore } from "~~/stores/talk/show";
import { useTalkDeleteStore } from "~~/stores/talk/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Talk } from "~~/types/talk";

const route = useRoute();
const router = useRouter();

const talkDeleteStore = useTalkDeleteStore();
const { error: deleteError, deleted } = storeToRefs(talkDeleteStore);

const talkShowStore = useTalkShowStore();

useMercureItem({
  store: talkShowStore,
  deleteStore: talkDeleteStore,
  redirectRouteName: "talks",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Talk>(`talks/${id}`);
talkShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    talkDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this talk?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      talkDeleteStore.setError(error.value);
      return;
    }

    talkDeleteStore.setDeleted(item.value);
    talkDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "talks" });
    }
  }
}

onBeforeUnmount(() => {
  talkShowStore.$reset();
});
</script>
