<script setup lang="ts">
import DropDownArrowSVG from '@/components/svgs/DropdownArrowSVG.vue'

const emit = defineEmits<{
  (event: 'component:click'): void
}>()
</script>

<template>
  <button
    class="text-center flex items-center justify-center bottom-5 animate-bounce h-12 w-12 text-neutral-50 bg-gray-800 hover:bg-gray-900 focus:outline-none rounded-full text-sm transition-all"
    @click="emit('component:click')"
  >
    <!-- <ArrowDownSVG /> -->
    <DropDownArrowSVG class="h-7 w-7" />
  </button>
</template>

<style scoped></style>
