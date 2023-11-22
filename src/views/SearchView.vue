<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useImageStore } from '@/stores/image.store'
import type { Image } from '@/models/image.type'
import ImagesList from '@/components/ImagesList.vue'
import NothingFoundMessage from '@/components/NothingFoundMessage.vue'
import router from '@/router'
import ImageDetailsModal from '@/components/ImageDetailsModal.vue'

const route = useRoute()

const imageStore = useImageStore()

const clickedImageUuid = ref<string>('')
const images = computed<Image[]>(() => imageStore.images)
const total = computed<number>(() => imageStore.totalImages)
const nothingFound = ref<boolean>(false)
const showDetails = ref<boolean>(false)

const limit = ref<number>(20)
const offset = ref<number>(0)
const filter = ref<string>('')

async function handleScroll(): Promise<void> {
  offset.value += limit.value
  await imageStore.fetch(offset.value, limit.value, filter.value)
}

function handleImageClicked(uuid: string): void {
  router.push({ name: 'search', query: { q: filter.value, item: uuid } })
}

function closeDetails(): void {
  router.push({ name: 'search', query: { q: filter.value } })
  showDetails.value = false
}

watch(() => route.query.q, async (q) => {
  filter.value = q as string
  imageStore.images = []
  offset.value = 0
  await imageStore.fetch(offset.value, limit.value, filter.value)

  nothingFound.value = images.value.length === 0
})

watch(() => route.query.item, async (item) => {
  showDetails.value = item !== undefined
  clickedImageUuid.value = item as string
})

onBeforeMount(async () => {
  filter.value = route.query.q as string
  imageStore.images = []
  await imageStore.fetch(offset.value, limit.value, filter.value)
  clickedImageUuid.value = route.query.item as string
  showDetails.value = clickedImageUuid.value !== undefined
  nothingFound.value = images.value.length === 0
})
</script>

<template>
  <section class="min-h-[calc(100vh-80px)] bg-neutral-50 relative">
    <ImagesList v-if="!nothingFound" :images="images" :total="total" class="" @component:scroll="handleScroll" @component:image-clicked="handleImageClicked" />
    <NothingFoundMessage v-else />
  </section>
  <ImageDetailsModal
    v-if="showDetails" :image-uuid="clickedImageUuid"
    @close="closeDetails"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  />
</template>

<style scoped></style>
