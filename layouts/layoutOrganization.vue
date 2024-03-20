<template>
  <div class="organization-layout">
    <q-card flat bordered class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ referentName }}</div>
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="(detail, index) in organizationDetails" :key="index">
            <q-item-label class="q-item-label">{{ detail.label }}</q-item-label>

            <q-item-section side>
              <q-item-section side top>{{ detail.value }}</q-item-section>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useOrganizationStore } from '~/store/organization';
import { useAsyncData } from '#app';
import { ref, computed } from 'vue';

const organizationStore = useOrganizationStore();
const { data: organizationData } = await useAsyncData('organizationData', () => organizationStore.fetchOrganizationData());
const organization = ref(organizationData.value['hydra:member'][0]);

const referentName = computed(() => organization.value.referent_name);

const organizationDetails = computed(() => [
  { label: 'Name', value: organization.value.name },
  { label: 'ID', value: organization.value.id },
  { label: 'Status', value: organization.value.status },
  { label: 'Referent fonction : ', value: organization.value.referent_function },
  { label: 'Referent mail : ', value: organization.value.referent_mail },
  { label: 'Referent Telephone', value: organization.value.referent_phone },
  { label: 'Referent Nom', value: organization.value.referent_name },

]);
</script>
<style scoped>
.my-card {
  max-width: 500px;
  margin: auto;
}

.organization-layout {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.q-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.q-item-label {
  font-weight: bold;
}
</style>