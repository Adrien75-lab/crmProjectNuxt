<!-- layouts/headerLayout.vue -->
<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Mon mini crm
                </q-toolbar-title>
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>
            <q-tabs align="left">
                <q-route-tab to="/pageProspect" label="Prospects" />
                <q-route-tab to="/pageUtilisateurs" label="Utilisateurs" />
                <q-route-tab to="/pageContacts" label="Contacts" />>
            </q-tabs>
        </q-header>
        <q-page-container>
            <NuxtPage />
        </q-page-container>
        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Mon mini crm
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup>

const toggleLeftDrawer = () => {};
const toggleRightDrawer = () => {};
</script>