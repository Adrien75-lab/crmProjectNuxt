<template>
  <div>
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

      <q-page-container>
        <slot></slot>
      </q-page-container>

      <q-footer elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            <div>Mon mini crm</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  props: ['organizationData'],
}
</script>