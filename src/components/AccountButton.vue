<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import router from '@/router'
import type { User } from '@/models/auth/user.type'
import DropdownArrowSVG from '@/components/svgs/DropdownArrowSVG.vue'

defineProps<{
  authenticatedUser: User | null
}>()

const emit = defineEmits<{
  (event: 'logout'): void
}>()

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <button
    id="dropdownInformationButton"
    data-testid="accountButton" data-dropdown-toggle="dropdownInformation"
    type="button"
    class="bg-transparent hover:bg-neutral-100 text-gray-800 text-sm px-5 py-2.5 font-bold hover:text-gray-800 border border-gray-800 hover:border-gray-900 rounded-full text-center inline-flex items-center transition-all"
  >
    Account <DropdownArrowSVG class="h-4 w-4 ml-1 mt-0.5" />
  </button>

  <!-- Dropdown menu -->
  <div
    id="dropdownInformation"
    class="z-10 hidden bg-neutral-50 divide-y divide-gray-100 rounded-3xl shadow w-44"
  >
    <div class="px-4 py-3 text-sm text-gray-800">
      <div>{{ authenticatedUser?.firstName }} {{ authenticatedUser?.lastName }}</div>
      <div data-testid="userEmail" class="font-medium truncate">
        {{ authenticatedUser?.email }}
      </div>
    </div>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <button class="block px-4 py-2 hover:bg-gray-100 w-full text-left" @click="router.push('/purchases')">
          Purchases
        </button>
      </li>
      <li>
        <button data-testid="myImagesButton" class="block px-4 py-2 hover:bg-gray-100 w-full text-left" @click="router.push('/images')">
          My
          Images
        </button>
      </li>
    </ul>
    <div class="py-2">
      <button
        class="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:font-semibold w-full text-left"
        @click="emit('logout')"
      >
        Sign
        out
      </button>
    </div>
  </div>
</template>

<style scoped></style>
