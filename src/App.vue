<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SiderbarProvider from '@/components/layout/SidebarProvider.vue'
import { Notifications } from '@kyvg/vue3-notification'
</script>

<template>
  <SiderbarProvider>
    <RouterView />
  </SiderbarProvider>
  <Notifications />
</template>

<style></style>
