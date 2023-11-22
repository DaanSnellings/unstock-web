<script setup lang="ts">
import router from '@/router'

function openCreateForm() {
  router.push({ name: 'create' })
}
</script>

<template>
  <button
    class="text-neutral-50 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 font-bold transition-all"
    @click="openCreateForm"
  >
    Create
  </button>
</template>

<style scoped></style>
