<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { ref } from 'vue'
import type { Image } from '@/models/image.type'
import CloudImage from '@/components/CloudImage.vue'
import DeleteComfirmationModal from '@/components/DeleteComfirmationModal.vue'

const props = defineProps<{
  images: Image[]
  total: number
}>()

const emit = defineEmits<{
  (event: 'deleteImage', uuid: string): void
  (event: 'component:scroll'): void
  (event: 'component:image-clicked', uuid: string): void
}>()

const firstTime = ref<boolean>(true)

const clickedImageUuid = ref<string>('')

function deleteImage() {
  emit('deleteImage', clickedImageUuid.value)
  closeDeleteModal()
}

function imageClicked(uuid: string): void {
  emit('component:image-clicked', uuid)
}

const deleteModalShown = ref<boolean>(false)

function openDeleteModal(uuid: string) {
  deleteModalShown.value = true
  clickedImageUuid.value = uuid
}

function closeDeleteModal() {
  deleteModalShown.value = false
  clickedImageUuid.value = ''
}

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
</script>

<template>
  <div class="relative bg-neutral-50">
    <div class="w-full pb-4 px-36">
      <MasonryWall data-testid="imagesList" :items="images" :column-width="600" :gap="16">
        <template #default="{ item }">
          <div class="container cursor-pointer">
            <div @click="imageClicked(item.uuid)">
              <CloudImage :image="item" />
            </div>
            <div class="button top-11 right-0">
              <button
                class="rounded-full p-3 bg-red-600 hover:bg-red-700 duration-300 ease-in-out"
                @click="openDeleteModal(item.uuid)"
              >
                <img alt="Close" class="" src="@/assets/svgs/trash-icon.svg">
              </button>
            </div>
          </div>
        </template>
      </MasonryWall>
    </div>

    <div v-if="images.length" v-observe-visibility="handleScrolledToBottom" class="bottom-[800px] w-full absolute" />

    <DeleteComfirmationModal
      v-if="deleteModalShown"
      @close="closeDeleteModal"
      @delete="deleteImage"
    />
  </div>
</template>

<style scoped>
.button {
    position: absolute;
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
