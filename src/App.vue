<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

import UnauthHeader from '@/components/UnauthHeader.vue'
import AuthHeader from '@/components/AuthHeader.vue'
import ToastMessage from '@/components/ToastMessage.vue'

const authStore = useAuthStore()

const isAuthenticated = computed<boolean>(() => authStore.isAuthenticated)

onMounted(() => {
  authStore.getUserInfo()
})
</script>

<template>
  <div v-if="isAuthenticated" class="overflow-x-hidden">
    <AuthHeader />
    <RouterView />
  </div>
  <div v-else class="h-screen overflow-hidden">
    <UnauthHeader />
    <RouterView />
  </div>
  <ToastMessage />
</template>
