<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { ref } from 'vue'
import PurchasedImage from './PurchasedImage.vue'
import type { Order } from '@/models/order.type'

const props = defineProps<{
  orders: Order[]
  total: number
}>()

const emit = defineEmits<{
  (event: 'component:scroll'): void
  (event: 'component:image-clicked', uuid: string): void
}>()

const firstTime = ref<boolean>(true)

function handleScrolledToBottom(isVisible: boolean): void {
  if (!isVisible)
    return
  if (firstTime.value) {
    firstTime.value = false
    return
  }
  if (props.orders.length >= props.total)
    return
  emit('component:scroll')
}

function imageClicked(uuid: string): void {
  emit('component:image-clicked', uuid)
}
</script>

<template>
  <div class="relative bg-neutral-50">
    <div class="w-full pb-4 px-36">
      <MasonryWall :items="orders" :column-width="600" :gap="16">
        <template #default="{ item }">
          <PurchasedImage class="relative cursor-pointer" :order="item" @component:image-clicked="imageClicked" />
        </template>
      </MasonryWall>
    </div>
    <div v-if="orders.length" v-observe-visibility="handleScrolledToBottom" class="bottom-[800px] w-full absolute" />
  </div>
</template>

<style scoped>
</style>
