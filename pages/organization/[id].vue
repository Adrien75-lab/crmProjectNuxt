<script setup>

import MainLayout from '@/layouts/MainLayout.vue';
import { useOrganizationStore } from '~/store/organization';
import { useAsyncData } from '#app';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import prospectLayout from '@/layouts/prospectLayout.vue';
import { useUserStore } from '~/store/userStore';
import { useTalkStore } from '~/store/talkStore';
import { useStepStore } from '~/store/stepStore';
import { useReminderStore } from '~/store/reminderStore';
import { useContactStore } from '~/store/contactStore';
import { format } from 'date-fns';
import { Quasar } from 'quasar';
import fr from 'quasar/lang/fr';
import { useQuasar } from 'quasar'

definePageMeta({
  layout: 'prospectLayout',

});

Quasar.lang.set(Quasar.lang.fr)

const { id } = useRoute().params;
const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const talkStore = useTalkStore();
const users = ref([]);
const talks = ref([]);
const stepStore = useStepStore();
const steps = ref([]);
const reminderStore = useReminderStore();
const reminders = ref([]);
const contactStore = useContactStore();
const contacts = ref([]);
const formatDate = (dateString) => {
 if (!dateString) return '';
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

onMounted(async () => {
  try {
    await Promise.all([
      userStore.fetchUsers(id),
      talkStore.fetchTalks(id),
      stepStore.fetchSteps(id),
      reminderStore.fetchReminders(id),
      contactStore.fetchContacts(id),
    ]);

    users.value = userStore.usersData['hydra:member'] || [];
    talks.value = talkStore.talksData['hydra:member'] || [];
    steps.value = stepStore.stepsData['hydra:member'] || [];
    reminders.value = reminderStore.remindersData['hydra:member'] || [];
    contacts.value = contactStore.contactsData['hydra:member'] || [];

    console.log("Données récupérées pour l'organisation ID " + id);
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
  }
});


const columns = ref([
  { name: 'firstName', label: 'Prénom', field: 'firstName', align: 'left', sortable: true },
  { name: 'lastName', label: 'Nom', field: 'lastName', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },

]);
const talkColumns = ref([
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'datetime', label: 'Date et heure', field: 'datetime', align: 'left', sortable: true },
  { name: 'note', label: 'Note', field: 'note', align: 'left', sortable: true },

]);

const stepColumns = ref([
  { name: 'description', label: 'Description', field: 'description', align: 'left', sortable: true },
  { name: 'color', label: 'Couleur', field: 'color', align: 'left', sortable: true },

]);

const reminderColumns = ref([
  { name: 'created_at', label: 'Date de creation', field: 'created_at', align: 'left', sortable: true },
  { name: 'note', label: 'Note', field: 'note', align: 'left', sortable: true },

]);

const contactColumns = ref([
  { name: 'firstName', label: 'Prenom', field: 'firstName', align: 'left', sortable: true },
  { name: 'note', label: 'Note', field: 'note', align: 'left', sortable: true },

]);

const loading = ref(false);
const pagination = ref({
  sortBy: 'firstName',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsPerPageLabel: 'Résultats par page',
  });

const { data: organizationData } = await useAsyncData('organizationData', () => organizationStore.fetchOrganizationById(id));
const organization = ref(organizationData.value);

const organizationDetails = [
  { label: 'ID', value: organization.value?.id },
  { label: 'Status', value: organization.value?.status },
  { label: 'Referent fonction : ', value: organization.value?.referent_function },
  { label: 'Referent mail : ', value: organization.value?.referent_mail },
  { label: 'Referent Telephone', value: organization.value?.referent_phone },
  { label: 'Referent Nom', value: organization.value?.referent_name },

];
const filterUsers = (text) => {
  users.value = userStore.usersData['hydra:member'].filter(
    (user) =>
      user.firstName.toLowerCase().includes(text.toLowerCase()) ||
      user.lastName.toLowerCase().includes(text.toLowerCase())
  );
};
const filterTalks = (text) => {
  talks.value = talkStore.talksData['hydra:member'].filter(
    (talk) =>
      talk.note.toLowerCase().includes(text.toLowerCase())
  );
};
const getRowClass = (row) => {
  switch (row.color) {
    case 'green':
      return 'bg-green-2 text-black';
    case 'red':
      return 'bg-red-2 text-black';
    default:
      return '';
  }
};
const customRowsNumberText = (start, end, total) => {
  return `Affichage de ${start} à ${end} de ${total}`;
};
const rowsNumberText = computed(() => {
  const start = pagination.value.page * pagination.value.rowsPerPage - pagination.value.rowsPerPage + 1;
  const end = start + pagination.value.rowsPerPage - 1;
  const total = users.value.length;
  return customRowsNumberText(start, end, total);
});

</script>
<template>
  <prospectLayout :left-drawer-open="leftDrawerOpen" :organization-data="organizationData" :users-data="users">
    
    <template #left-drawer-content>
      <div v-if="organization">
        <q-card flat bordered class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ organization.referent_name }}</div>
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
      <div v-else>
        <p>Loading organization data...</p>
      </div>
    </template>
    <template #default>
      <div class="q-pa-md">
        <div v-if="userStore.usersData && userStore.usersData['hydra:member'].length > 0">
          <q-table title="Liste des utilisateurs" :rows="users" :columns="columns" row-key="name"
            v-model:pagination="pagination" :loading="loading" binary-state-sort flat bordered virtual-scroll
            :rows-per-page-label="pagination.rowsPerPageLabel" :pagination.sync="pagination"
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
              <q-input filled v-model="filter" placeholder="Recherche" dense debounce="300"
                @update:model-value="filterUsers(filter)">
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
        <div v-else>
          <q-item>
            Aucun utilisateur trouvé.
          </q-item>
        </div>
      </div>
    </template>
    <template v-slot:contacts>
      <div v-if="contactStore.contactsData && contactStore.contactsData['hydra:member'].length > 0">
        <q-toolbar>
          <q-toolbar-title>
            <q-icon name="chat" />
            Liste des contacts
          </q-toolbar-title>
          <q-space />
          <q-input filled v-model="filter" placeholder="Recherche" dense debounce="300"
            @update:model-value="filterTalks(filter)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-table title="Liste des contacts" :rows="contacts" :columns="contactColumns" row-key="name"
          v-model:pagination="pagination" :loading="loading" binary-state-sort flat bordered virtual-scroll
          :rows-per-page-label="pagination.rowsPerPageLabel">
          <!-- ... -->
        </q-table>
      </div>
      <div v-else>
        <q-item>
          Aucun talk trouvé.
        </q-item>
      </div>
    </template>
    <template v-slot:reminders>
      <div v-if="reminderStore.remindersData && reminderStore.remindersData['hydra:member'].length > 0">
        <q-toolbar>
          <q-toolbar-title>
            <q-icon name="access_time" />
            Rappel
          </q-toolbar-title>
          <q-space />
          <q-input filled v-model="filter" placeholder="Recherche" dense debounce="300"
            @update:model-value="filterTalks(filter)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-table title="Liste des rappels" :rows="reminders" :columns="reminderColumns" row-key="name"
          v-model:pagination="pagination" :loading="loading" binary-state-sort flat bordered virtual-scroll
          :rows-per-page-label="pagination.rowsPerPageLabel">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="created_at" :props="props">
                {{ formatDate(props.row.created_at) }}
              </q-td>
              <q-td key="note" :props="props">
                {{ props.row.note }}
              </q-td>
             </q-tr>
          </template>
        </q-table>
      </div>
      <div v-else>
        <q-item>
          Aucun talk trouvé.
        </q-item>
      </div>
    </template>
    <template v-slot:steps>
      <div v-if="stepStore.stepsData && stepStore.stepsData['hydra:member'].length > 0">
        <q-toolbar>
          <q-toolbar-title>
            <q-icon name="steps" />
            Etats
          </q-toolbar-title>
          <q-space />
          <q-input filled v-model="filter" placeholder="Recherche" dense debounce="300"
            @update:model-value="filterSteps(filter)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-table title="Etats" :rows="steps" :columns="stepColumns" row-key="name" v-model:pagination="pagination"
          :loading="loading" binary-state-sort flat bordered virtual-scroll>
          <template v-slot:body="props">
            <q-tr :props="props" :class="getRowClass(props.row)">
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="color" :props="props">
                <div class="q-gutter-x-sm">
                  <q-badge :color="props.row.color" />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div v-else>
        <q-item>
          Aucun état trouvé
        </q-item>
      </div>
    </template>

  </prospectLayout>
</template>

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