<template>
  <div class="flex items-center justify-between">
    <h1 class="text-3xl my-4">Talk List</h1>

    <nuxt-link
      :to="{ name: 'talks-create' }"
      class="px-6 py-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
    >
      Create
    </nuxt-link>
  </div>

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

  <div
    v-if="deletedItem || mercureDeletedItem"
    class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
    role="status"
  >
    <template v-if="deletedItem">{{ deletedItem["@id"] }} deleted.</template>
    <template v-else-if="mercureDeletedItem">
      {{ mercureDeletedItem["@id"] }} deleted by another user.
    </template>
  </div>

  <div v-if="!isLoading" class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            id
          </th>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            datetime
          </th>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            note
          </th>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            organization
          </th>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            user
          </th>
          <th class="text-sm font-medium px-6 py-4 text-left capitalize">
            talks
          </th>
          <th
            colspan="2"
            class="text-sm font-medium px-6 py-4 text-left capitalize"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item['@id']" class="border-b">
          <td class="px-6 py-4 text-sm">
            <nuxt-link
              :to="{ name: 'talks-id', params: { id: getIdFromIri(item['@id']) } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item["@id"] }}
            </nuxt-link>
          </td>
          <td class="px-6 py-4 text-sm">
            {{ formatDateTime(item.datetime) }}
          </td>
          <td class="px-6 py-4 text-sm">
            {{ item.note }}
                    </td>
          <td class="px-6 py-4 text-sm">
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
          <td class="px-6 py-4 text-sm">
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
          <td class="px-6 py-4 text-sm">
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
          <td class="px-6 py-4 text-sm">
            <nuxt-link
              :to="{ name: 'talks-id', params: { id: getIdFromIri(item['@id']) } }"
              class="px-6 py-2 bg-blue-600 text-white text-xs rounded shadow-md hover:bg-blue-700"
            >
              Show
            </nuxt-link>
          </td>
          <td class="px-6 py-4 text-sm">
            <nuxt-link
              :to="{ name: 'talks-id-edit', params: { id: getIdFromIri(item['@id']) } }"
              class="px-6 py-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
            >
              Edit
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="view" class="flex justify-center">
    <nav aria-label="Page navigation">
      <ul class="flex list-style-none">
        <li :class="{ disabled: !pagination.previous }">
          <nuxt-link
            :to="{
              name: 'talks-page-page',
              params: { page: pagination.first },
            }"
            aria-label="First page"
            :class="
              !pagination.previous
                ? 'text-gray-500 pointer-events-none'
                : 'text-gray-800 hover:bg-gray-200'
            "
            class="block py-2 px-3 rounded"
          >
            <span aria-hidden="true">&lArr;</span> First
          </nuxt-link>
        </li>

        <li :class="{ disabled: !pagination.previous }">
          <nuxt-link
            :to="{
              name: 'talks-page-page',
              params: { page: pagination.previous ?? pagination.first },
            }"
            :class="
              !pagination.previous
                ? 'text-gray-500 pointer-events-none'
                : 'text-gray-800 hover:bg-gray-200'
            "
            class="block py-2 px-3 rounded"
            aria-label="Previous page"
          >
            <span aria-hidden="true">&larr;</span> Previous
          </nuxt-link>
        </li>

        <li :class="{ disabled: !pagination.next }">
          <nuxt-link
            :to="{
              name: 'talks-page-page',
              params: { page: pagination.next ?? pagination.last },
            }"
            :class="
              !pagination.next
                ? 'text-gray-500 pointer-events-none'
                : 'text-gray-800 hover:bg-gray-200'
            "
            class="block py-2 px-3 rounded"
            aria-label="Next page"
          >
            Next <span aria-hidden="true">&rarr;</span>
          </nuxt-link>
        </li>

        <li :class="{ disabled: !pagination.next }">
          <nuxt-link
            :to="{ name: 'talks-page-page', params: { page: pagination.last } }"
            :class="
              !pagination.next
                ? 'text-gray-500 pointer-events-none'
                : 'text-gray-800 hover:bg-gray-200'
            "
            class="block py-2 px-3 rounded"
            aria-label="Last page"
          >
            Last <span aria-hidden="true">&rArr;</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMercureList } from "~~/composables/mercureList";
import { useTalkDeleteStore } from "~~/stores/talk/delete";
import { useTalkListStore } from "~~/stores/talk/list";
import { useFetchList } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Talk } from "~~/types/talk";

const router = useRouter();

const talkDeleteStore = useTalkDeleteStore();
const { deleted: deletedItem, mercureDeleted: mercureDeletedItem } =
  storeToRefs(talkDeleteStore);

const talkListStore = useTalkListStore();
const { items, view, error, isLoading, hubUrl } = await useFetchList<Talk>(
  "talks"
);
talkListStore.setData({ items, view, error, isLoading, hubUrl });

const pagination = {
  first: view.value?.["hydra:first"]?.slice(-1),
  previous: view.value?.["hydra:previous"]?.slice(-1),
  next: view.value?.["hydra:next"]?.slice(-1),
  last: view.value?.["hydra:last"]?.slice(-1),
};

useMercureList({ store: talkListStore, deleteStore: talkDeleteStore });

onBeforeUnmount(() => {
  talkListStore.$reset();
  talkDeleteStore.$reset();
});
</script>
