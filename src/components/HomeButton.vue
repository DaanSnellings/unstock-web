<script setup lang="ts">
import router from '@/router'

function goToHome() {
  router.push({ name: 'authenticated-home' })
}
</script>

<template>
  <button class="flex-none align-middle" @click="goToHome">
    <img class="flex object-cover h-6" alt="Logo" src="@/assets/svgs/logo.svg">
  </button>
</template>

<style scoped></style>
