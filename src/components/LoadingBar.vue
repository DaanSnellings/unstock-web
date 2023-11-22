<script setup lang="ts">
defineProps({
  isLoading: Boolean,
})
</script>

<template>
  <div v-if="isLoading" class="loader bottom-0 right-0 absolute" />
</template>

<style scoped>
.loader
{
  width: 100%;
  height: 5px;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}
.loader::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #CCFF00, #fafafa, #fafafa, #fafafa, #fafafa, #fafafa, #CCFF00);
  animation: animate 5s infinite linear;
  background-size: 500%;
}

.loader::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #CCFF00, #fafafa, #fafafa, #fafafa, #fafafa, #fafafa, #CCFF00);
  animation: animate 5s infinite linear;
  background-size: 500%;
  filter: blur(20px);
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }
  0% {
    background-position: 500% 0;
  }
}
</style>
