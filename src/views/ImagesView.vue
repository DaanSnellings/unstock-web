<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useImageStore } from '@/stores/image.store'
import type { Image } from '@/models/image.type'
import UserImagesList from '@/components/UserImagesList.vue'
import ImageDetailsModal from '@/components/ImageDetailsModal.vue'
import NoImagesMessage from '@/components/NoImagesMessage.vue'

const imageStore = useImageStore()
const authStore = useAuthStore()

const limit = ref<number>(10)
const offset = ref<number>(0)
const showDetails = ref<boolean>(false)
const clickedImageUuid = ref<string>('')

const nothingFound = ref<boolean>(false)
const imagesByCurrentUser = computed<Image[]>(() => imageStore.imagesByCurrentUser)
const total = computed<number>(() => imageStore.totalImagesByCurrentUser)

async function deleteImage(uuid: string) {
  await imageStore.deleteImage(uuid)
  await imageStore.fetchAllByCurrentUser(offset.value, limit.value)
}

async function handleScroll(): Promise<void> {
  offset.value += limit.value
  await imageStore.fetchAllByCurrentUser(offset.value, limit.value)
}

function handleImageClicked(uuid: string): void {
  clickedImageUuid.value = uuid
  showDetails.value = true
}

onBeforeMount(async () => {
  imageStore.imagesByCurrentUser = []
  await authStore.getUserInfo()
  await imageStore.fetchAllByCurrentUser(offset.value, limit.value)
  nothingFound.value = imagesByCurrentUser.value.length === 0
})
</script>

<template>
  <section class="min-h-[calc(100vh-80px)] bg-neutral-50 pt-4 overflow-hidden">
    <div v-if="!nothingFound">
      <div class="text-center">
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-800">
          My images
        </h1>
      </div>
      <UserImagesList :images="imagesByCurrentUser" :total="total" @delete-image="(uuid) => deleteImage(uuid)" @component:scroll="handleScroll" @component:image-clicked="handleImageClicked" />
    </div>
    <NoImagesMessage v-if="nothingFound" v-motion-slide-bottom data-testid="noImagesMessage" />
  </section>
  <ImageDetailsModal
    v-if="showDetails"
    data-testid="imageDetailsModal" :image-uuid="clickedImageUuid"
    @close="showDetails = false"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  />
</template>

<style scoped></style>
