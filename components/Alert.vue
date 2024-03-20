<template>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-primary">This is an alert component</div>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  import { QCard, QCardSection } from 'quasar'
  </script>
  
  <style scoped>
  .my-card {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
  }
  
  .text-primary {
    color: #1976d2;
  }
  </style>