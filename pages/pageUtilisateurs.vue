<template>
  <MainLayout 
    :organizationData="organizationData"
    :leftDrawerOpen="leftDrawerOpen"
    :rightDrawerOpen="rightDrawerOpen"
    @update:left-drawer-open="leftDrawerOpen = $event"
    @update:right-drawer-open="rightDrawerOpen = $event"
  >
    <!-- Contenu spécifique à chaque page ici -->
    <div>Test Utilisateurs</div>
  </MainLayout>
</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
definePageMeta({
layout: 'MainLayout', // Assurez-vous que le nom correspond au nom du fichier de layout sans l'extension .vue
});
</script>