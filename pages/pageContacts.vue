<template>
    <MainLayout 
      :organizationData="organizationData"
      :leftDrawerOpen="leftDrawerOpen"
      :rightDrawerOpen="rightDrawerOpen"
      @update:left-drawer-open="leftDrawerOpen = $event"
      @update:right-drawer-open="rightDrawerOpen = $event"
    >
      
      <div>Test Contacts</div>
    </MainLayout>
  </template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
definePageMeta({
  layout: 'MainLayout',
});
</script>