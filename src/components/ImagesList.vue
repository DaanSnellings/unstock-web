<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { ref } from 'vue'
import type { Image } from '@/models/image.type'
import CloudImage from '@/components/CloudImage.vue'

const props = defineProps<{
  images: Image[]
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
  if (props.images.length >= props.total)
    return
  emit('component:scroll')
}

function imageClicked(uuid: string): void {
  emit('component:image-clicked', uuid)
}
</script>

<template>
  <div class="relative bg-neutral-50">
    <div class="w-full p-4 px-24">
      <MasonryWall :items="images" :column-width="420" :gap="16">
        <template #default="{ item }">
          <div class="relative cursor-pointer" @click="imageClicked(item.uuid)">
            <CloudImage class="" :image="item" />
            <div class="w-full rounded-3xl absolute inset-0 hover:bg-gray-900 hover:bg-opacity-25 transition-all" />
          </div>
        </template>
      </MasonryWall>
    </div>
    <div v-if="images.length" v-observe-visibility="handleScrolledToBottom" class="bottom-[800px] w-full absolute" />
  </div>
</template>

<style scoped></style>
