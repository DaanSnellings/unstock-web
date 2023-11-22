<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import CloudImage from './CloudImage.vue'
import { useImageStore } from '@/stores/image.store'
import router from '@/router'
import { useOrderStore } from '@/stores/order.store'
import { useAuthStore } from '@/stores/auth.store'
import type { Image } from '@/models/image.type'
import type { UserInfo } from '@/models/auth/userInfo.type'
import { cld } from '@/services/cloudinary.service'
import PurchaseSVG from '@/components/svgs/PurchaseSVG.vue'
import DownloadSVG from '@/components/svgs/DownloadSVG.vue'

const props = defineProps({
  imageUuid: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

const imageStore = useImageStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const imageUuid = props.imageUuid
const image = ref<Image | null>(null)
const url = ref<string>()

const userinfo = computed<UserInfo | null>(() => authStore.userinfo)

const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

const formatedPrice = computed(() => {
  if (!image.value)
    return ''
  return formatter.format(image.value?.price as number)
})

function searchOnKeyword(keyword: string) {
  router.push({ name: 'search', query: { q: keyword } })
}

function purchase() {
  orderStore.createOrder(image.value?.uuid as string, userinfo.value?.uuid as string)
  router.push({ name: 'purchases' })
}

onBeforeMount(async () => {
  image.value = await imageStore.getImageById(imageUuid, userinfo.value?.uuid)
  url.value = cld.image(image.value?.url).addFlag('attachment').toURL()
})
</script>

<template>
  <div class="popup">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
      <div v-motion-fade class="relative flex p-6 gap-4 bg-neutral-50 rounded-lg shadow-2xl md:mt-0 sm:max-w-6xl lg:max-w-7xl sm:max-h-full">
        <button class="z-10 absolute p-2 w-8 right-4 top-4 hover:bg-neutral-200 rounded-full" @click="emit('close')">
          <img alt="Close" src="@/assets/svgs/close-icon.svg">
        </button>
        <div class="flex-1 space-y-4 md:space-y-5 relative ">
          <CloudImage v-if="image" class="h-[500px] w-full rounded-3xl border-2" :image="image" />
        </div>
        <div class="w-[300px] gap-4 flex flex-col relative">
          <div class="tracking-wide text-3xl font-semibold w-[calc(100%-30px)] text-gray-800">
            {{ image?.title }}
          </div>

          <div class="font-semibold underline w-full text-gray-800">
            Keywords
          </div>

          <div class="w-full flex flex-wrap">
            <button
              v-for="keyword in image?.keywords" :key="keyword"
              class="bg-neutral-50 hover:bg-neutral-100 text-gray-800 text-sm mr-2 mb-2 px-5 py-2.5 font-medium hover:text-gray-800 border border-neutral-200 hover:border-neutral-400 rounded-full text-center inline-flex items-center focus:ring-4 focus:ring-gray-300 duration-300 ease-in-out"
              @click="searchOnKeyword(keyword)"
            >
              {{ keyword }}
            </button>
          </div>

          <div class="w-full flex items-end justify-between flex-1">
            <span class="text-3xl font-extrabold text-gray-800">{{ formatedPrice }}</span>

            <a
              v-if="image?.isPurchased"
              :href="url"
              class="text-neutral-50 bg-gray-800 hover:text-gray-800 hover:bg-[#CCFF00] font-medium rounded-full text-sm px-8 py-3 text-center inline-flex items-center duration-300 ease-in-out"
              @click="imageStore.activateLoadingAnimation()"
            >
              <DownloadSVG />
              <span>Download</span>
            </a>

            <button
              v-else
              class="text-neutral-50 bg-gray-800 hover:text-gray-800 hover:bg-[#CCFF00] font-medium rounded-full text-sm px-8 py-3 text-center inline-flex items-center duration-300 ease-in-out"
              @click="purchase"
            >
              <PurchaseSVG />
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
