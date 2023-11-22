<script setup lang="ts">
import RotatingWords from '@/components/RotatingWords.vue'
</script>

<template>
  <div class="test relative w-full h-[calc(100vh-80px)] bg-neutral-50 flex justify-center pt-24">
    <img src="@/assets/svgs/layered-waves-haikei1.svg" class="absolute bottom-0 left-0 w-full">
    <RotatingWords />
  </div>
</template>

<style scoped>
</style>
