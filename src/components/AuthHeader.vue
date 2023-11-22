<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'
import HomeButton from '@/components/HomeButton.vue'
import MaginifyingGlass from '@/components/svgs/MagnifyingGlassSVG.vue'
import CreateButton from '@/components/CreateButton.vue'
import AccountButton from '@/components/AccountButton.vue'
import LoadingBar from '@/components/LoadingBar.vue'
import type { User } from '@/models/auth/user.type'
import { useImageStore } from '@/stores/image.store'
import { useOrderStore } from '@/stores/order.store'

const route = useRoute()

const authStore = useAuthStore()
const imageStore = useImageStore()
const orderStore = useOrderStore()

const isLoading = computed<boolean>(() => authStore.isLoading || imageStore.isLoading || orderStore.isLoading)

const input = ref('')
const searchInput = ref()
const searchForm = ref<HTMLFormElement>()

const authenticatedUser = computed<User | null>(() => authStore.authenticatedUser)

function logout() {
  authStore.logout()
}

function search() {
  searchForm.value?.submit()
}

function onSubmit() {
  searchInput.value.blur()
  router.push({ name: 'search', query: { q: input.value } })
}

watch(() => route.query, (query) => {
  input.value = query.q as string
})
</script>

<template>
  <nav id="header" class="bg-neutral-50 space-x-5 h-[80px] flex items-center shadow-sm sticky top-0 z-10">
    <HomeButton class="pl-4" />

    <div class="w-full bg-neutral-50">
      <div class="relative">
        <form @submit.prevent="onSubmit">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <button @click="search">
              <MaginifyingGlass />
            </button>
          </div>

          <input
            ref="searchInput" v-model="input" type="text" placeholder="Search"
            class="bg-gray-200 rounded-full p-2 pl-9 w-full border-none focus:ring-gray-800 text-gray-800" required @keydown.enter="search"
          >
        </form>
      </div>
    </div>

    <div class="flex-none space-x-2 bg-neutral-50 pr-4">
      <CreateButton />
      <AccountButton :authenticated-user="authenticatedUser" @logout="logout" />
    </div>
    <LoadingBar :is-loading="isLoading" />
  </nav>
</template>

<style scoped>

</style>
