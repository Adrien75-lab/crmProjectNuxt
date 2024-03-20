<template>
  <MainLayout 
    :organizationData="organizationData"
    :leftDrawerOpen="leftDrawerOpen"
    :rightDrawerOpen="rightDrawerOpen"
    @update:left-drawer-open="leftDrawerOpen = $event"
    @update:right-drawer-open="rightDrawerOpen = $event"
  >
  
    <div class="q-pa-md">
      
      <q-table
        v-if="organizations.length > 0"
        :rows="organizations"
        :columns="columns"
        row-key="id"
        :virtual-scroll="true"
        
      :filter="search"
      :filter-method="customFilter"
        class="rounded-borders shadow-2"
        no-data-label="Aucune donnée disponible"
        dense
        dark
        flat
        color="green"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <nuxt-link :to="`/organization/${props.row.id}`" class="btn btn-primary" dense flat round>
              <span class="material-icons">visibility</span>
            </nuxt-link>
            <q-btn color="secondary" icon="edit" dense flat round @click="editOrganization(props.row)" />
            <q-btn color="negative" icon="delete" dense flat round @click="deleteOrganization(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useOrganizationStore } from '~/store/organization';
import { ref, watchEffect } from 'vue';
import { useAsyncData } from '#app';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'MainLayout',
});

const organizations = ref([]);
const organizationStore = useOrganizationStore();

watchEffect(async () => {
  const { data: organizationsData, error, loading } = await useAsyncData('organizationsData', async () => {
    try {
      await organizationStore.fetchOrganizationData();
      return organizationStore.organizationData['hydra:member'];
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      throw error;
    }
  });

  organizations.value = organizationsData.value;
  console.log("Organisations après l'assignation :", organizations.value);
});

const viewOrganization = (organization) => {
 
};

const editOrganization = (organization) => {
  
};

const deleteOrganization = (organization) => {
  
};

const columns = [
  { name: 'name', label: 'Nom', field: 'name', align: 'left', class: 'text-weight-bold text-primary' },
  { name: 'id', label: 'ID', field: 'id', align: 'center', class: 'text-weight-semibold' },
  { name: 'status', label: 'Statut', field: 'status', align: 'center', class: 'text-weight-semibold' },
  { name: 'referent_function', label: 'Fonction du Référent', field: 'referent_function', align: 'center', class: 'text-weight-semibold' },
  { name: 'referent_mail', label: 'Mail du Référent', field: 'referent_mail', align: 'center', class: 'text-weight-semibold' },
  { name: 'referent_phone', label: 'Téléphone du Référent', field: 'referent_phone', align: 'center', class: 'text-weight-semibold' },
  { name: 'referent_name', label: 'Nom du Référent', field: 'referent_name', align: 'center', class: 'text-weight-semibold' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center', class: 'text-weight-semibold' },
];

</script>
<style scoped>

.custom-table .q-table {
  --q-table-header-bgcolor: #f9f9f9;
  --q-table-row-bgcolor: #fff;
  --q-table-row-hover-bgcolor: #f4f4f4;
}

.rounded-borders {
  border-radius: 8px;
  overflow: hidden;
}

.shadow-2 {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.action-view {
  color: #4CAF50;
}

.action-edit {
  color: #FFC107;
}

.action-delete {
  color: #F44336;
}

.action-view:hover,
.action-edit:hover,
.action-delete:hover {
  background: rgba(0, 0, 0, 0.05);
}

.text-weight-bold {
  font-weight: bold;
  color: red;
}

.text-weight-semibold {
  font-weight: 600;
  color: #555;
}
</style>