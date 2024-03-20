<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Mon mini crm
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/pageProspect" label="Prospects" />
        <q-route-tab to="/pageUtilisateurs" label="Utilisateurs" />
        <q-route-tab to="/pageContacts" label="Contacts" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <slot name="left-drawer-content"></slot>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-row class="q-pa-md">
        <q-col cols="12" sm="6">
          <slot name="reminders"></slot>
        </q-col>
        <q-col cols="12" sm="6">
          <slot name="steps"></slot>
        </q-col>
      </q-row>
    </q-drawer>
    <q-page-container>
      <q-row class="q-pa-md" justify="center">
        <q-col cols="12" sm="6">
          <slot></slot>
        </q-col>
        <q-col cols="12" sm="6">
          <!-- Ajoutez l'autre conteneur ici -->
          <slot name="contacts"></slot>

        </q-col>
      </q-row>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, toRefs } from 'vue';
import LayoutUsers from '@/layouts/layoutUsers.vue'

export default {

  name: 'prospectLayout',
  props: {
    organizationData: {
      type: Object,
      default: () => { }
    },
    leftDrawerOpen: {
      type: Boolean,
      default: false
    },
    rightDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { leftDrawerOpen, rightDrawerOpen } = toRefs(props);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
      emit('update:leftDrawerOpen', leftDrawerOpen.value);
    }

    function toggleRightDrawer() {
      rightDrawerOpen.value = !rightDrawerOpen.value;
      emit('update:rightDrawerOpen', rightDrawerOpen.value);
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      organizationData: props.organizationData
    };
  }
};
</script>
