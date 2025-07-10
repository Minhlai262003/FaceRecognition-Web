<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SiderbarProvider from '@/components/layout/SidebarProvider.vue'
import { Notifications } from '@kyvg/vue3-notification'
</script>

<template>
  <SiderbarProvider>
    <RouterView />
  </SiderbarProvider>
  <Notifications class="w-[500px]" />
</template>

<style>
.vue-notification {
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 30px !important;
  min-height: 140px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
}
</style>
