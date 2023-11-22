<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import CreateForm from '@/components/CreateForm.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUserInfo()
})
</script>

<template>
  <div class="w-full h-[calc(100vh-80px)] bg-neutral-50 pt-8">
    <CreateForm />
  </div>
</template>

<style scoped></style>
