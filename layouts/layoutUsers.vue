<template>
  <div class="q-pa-md">
    <q-table
      title="Liste des utilisateurs"
      :rows="users"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      :loading="loading"
      binary-state-sort
      flat
      bordered
      virtual-scroll
    >
      <template v-slot:top="props">
        <q-toolbar>
          <q-toolbar-title>
            <q-icon name="people" />
            Liste des utilisateurs
          </q-toolbar-title>
          <q-space />
          <q-btn flat color="primary" icon="add" label="Ajouter un élément" @click="addUser" />
        </q-toolbar>
        <q-input filled v-model="props.filter" placeholder="Recherche" dense debounce="300">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn flat icon="edit" @click="editUser(props.row)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import { useAsyncData } from '#app';
import { ref, computed } from 'vue';

const userStore = useUserStore();
const { data: usersData } = await useAsyncData('userData', () => userStore.fetchUsers());
console.log('Données users :', usersData.value);
const users = computed(() => usersData.value?.['hydra:member'] || []);


const columns = ref([
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'firstName', label: 'Prénom', field: 'firstName', align: 'left', sortable: true },
  { name: 'lastname', label: 'Nom', field: 'lastName', align: 'left', sortable: true },
  
]);


const addUser = () => {
  
};

const editUser = (user) => {
 
};
</script>
