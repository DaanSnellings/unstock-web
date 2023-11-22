<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useOrderStore } from '@/stores/order.store'
import NoPurchasesMessage from '@/components/NoPurchasesMessage.vue'
import PurchasedList from '@/components/PurchasedList.vue'
import type { Order } from '@/models/order.type'
import ImageDetailsModal from '@/components/ImageDetailsModal.vue'

const orderStore = useOrderStore()
const authStore = useAuthStore()

const limit = ref<number>(10)
const offset = ref<number>(0)
const showDetails = ref<boolean>(false)
const clickedImageUuid = ref<string>('')

const nothingFound = ref<boolean>(false)
const ordersByUserId = computed<Order[]>(() => orderStore.ordersByUserId)
const total = computed<number>(() => orderStore.totalOrdersByCurrentUser)

async function handleScroll(): Promise<void> {
  offset.value += limit.value
  await orderStore.fetchByCurrentUser(offset.value, limit.value)
}

function handleImageClicked(uuid: string): void {
  clickedImageUuid.value = uuid
  showDetails.value = true
}

onBeforeMount(async () => {
  orderStore.ordersByUserId = []
  await authStore.getUserInfo()
  await orderStore.fetchByCurrentUser(offset.value, limit.value)
  nothingFound.value = ordersByUserId.value.length === 0
})
</script>

<template>
  <section class="min-h-[calc(100vh-80px)] bg-neutral-50 pt-4 overflow-hidden">
    <div v-if="!nothingFound">
      <div class="text-center">
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-800">
          Purchases
        </h1>
      </div>
      <PurchasedList :orders="ordersByUserId" :total="total" @component:scroll="handleScroll" @component:image-clicked="handleImageClicked" />
    </div>
    <NoPurchasesMessage v-if="nothingFound" v-motion-slide-bottom />
  </section>
  <ImageDetailsModal
    v-if="showDetails" :image-uuid="clickedImageUuid"
    @close="showDetails = false"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  />
</template>

<style scoped></style>
