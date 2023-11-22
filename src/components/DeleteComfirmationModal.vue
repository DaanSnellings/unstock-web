<script setup lang="ts">
const emit = defineEmits<{
  (event: 'delete'): void
  (event: 'close'): void
}>()
</script>

<template>
  <div v-motion-fade class="popup">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
      <div class="relative p-4 text-center bg-white rounded-lg shadow">
        <button class="p-2 w-7 absolute right-3 top-3 hover:bg-neutral-200 rounded-full" @click="emit('close')">
          <img alt="Close" src="@/assets/svgs/close-icon.svg">
        </button>
        <img alt="Close" src="@/assets/svgs/trash-icon.svg" class="w-10 h-10 mb-3.5 mx-auto">
        <p class="mb-4 text-gray-800">
          Are you sure you want to delete this image?
        </p>
        <div class="flex justify-center items-center space-x-4">
          <button
            class="bg-neutral-50 hover:bg-neutral-100 text-gray-800 py-2 px-3 font-medium text-sm hover:text-gray-800 border border-neutral-200 hover:border-neutral-400 rounded-full text-center inline-flex items-center focus:ring-4 focus:ring-gray-300 duration-300 ease-in-out"
            @click="emit('close')"
          >
            No, cancel
          </button>
          <button
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-700 rounded-full focus:ring-4 focus:outline-none focus:ring-red-300 duration-300 ease-in-out"
            @click="emit('delete')"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
