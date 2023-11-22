<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { cld } from '@/services/cloudinary.service'
import type { Order } from '@/models/order.type'
import CloudImage from '@/components/CloudImage.vue'
import { useImageStore } from '@/stores/image.store'
import DownloadSVG from '@/components/svgs/DownloadSVG.vue'

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  (event: 'component:image-clicked', uuid: string): void
}>()

const imageStore = useImageStore()

const url = cld.image(props.order.image.url).addFlag('attachment').toURL()

function imageClicked(): void {
  emit('component:image-clicked', props.order.image.uuid)
}
</script>

<template>
  <div class="container">
    <div @click="imageClicked">
      <CloudImage class="" :image="order.image" />
    </div>
    <div class="button">
      <a
        :href="url" class="text-neutral-50 bg-gray-800 hover:text-gray-800 hover:bg-[#CCFF00] font-medium rounded-full text-sm px-8 py-4 text-center inline-flex items-center duration-300 ease-in-out"
        @click="imageStore.activateLoadingAnimation()"
      >
        <DownloadSVG />
        <span>Download</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity .35s ease;
}

.container {
    position: relative;
}

.container:hover .button {
    opacity: 1;
}
</style>
