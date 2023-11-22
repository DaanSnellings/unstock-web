<script setup lang="ts">
import RegisterFormHomePage from '@/components/RegisterFormHomePage.vue'
</script>

<template>
  <div class=" w-full h-full flex items-center justify-center">
    <h1 v-motion-slide-visible-left class="font-extrabold leading-tight tracking-tight text-neutral-50 text-left pl-24 pr-16 pb-24 text-7xl z-10">
      Become a member and start looking for <a class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">UNSTOCKPHOTOS</a>
    </h1>
  </div>
  <div class=" w-full h-full flex items-center justify-center">
    <RegisterFormHomePage />
  </div>
</template>
