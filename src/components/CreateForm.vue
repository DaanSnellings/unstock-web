<script setup lang="ts">
import { type Ref, computed, ref } from 'vue'
import { useImageStore } from '@/stores/image.store'
import router from '@/router'
import UploadSVG from '@/components/svgs/UploadSVG.vue'
import KeywordsButton from '@/components/KeywordsButton.vue'

const imageStore = useImageStore()

const isLoading = computed<boolean>(() => imageStore.isLoading)

const image = ref()
const title = ref()
const keywords = ref<string[]>([])
const price = ref()

const euroSign = ref<HTMLDivElement>() as Ref<HTMLDivElement>

function fileChangeHandler(event: Event) {
  const target = event.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]
  const reader = new FileReader()
  reader.onload = () => {
    image.value = reader.result
  }
  reader.readAsDataURL(file)
}

function cancel() {
  image.value = null
}

async function create() {
  await imageStore.addImage(title.value, keywords.value, price.value, image.value)
  router.push({ name: 'authenticated-home' })
}

function onFocus(e: Event) {
  const target = e.target as HTMLInputElement
  target.style.color = '#009899'
  euroSign.value.style.color = '#009899'
}

function onBlur(e: Event) {
  const target = e.target as HTMLInputElement
  target.style.color = '#373d4a'
  euroSign.value.style.color = '#6b7280'
}

function keyDown(e: any) {
  const ev = window.event || e
  const key = ev.keyCode
  if (key === 32)
    e.preventDefault()
}

function addKeyword(e: Event) {
  const target = e.target as HTMLInputElement
  const text = target.value

  if (text === '' || keywords.value.includes(text) || text.includes('.'))
    return

  target.value = ''

  keywords.value.push(text)
}

function handleKeywordClicked(index: number) {
  keywords.value.splice(index, 1)
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="bg-neutral-50 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
    <div v-motion-fade class="w-full flex bg-neutral-100 rounded-lg shadow-2xl md:mt-0 xl:p-0 sm:max-w-5xl">
      <div class="w-2/5 flex-1 space-y-4 md:space-y-5 sm:p-8">
        <div v-if="!image" class="bg-neutral-50 rounded-lg p-7 h-full">
          <div class="flex items-center justify-center w-full h-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadSVG />
                <p class="mb-2 text-sm text-gray-500">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500">SVG, PNG, JPG</p>
              </div>
              <input id="dropzone-file" type="file" accept="image/*" class="hidden" @change="fileChangeHandler">
            </label>
          </div>
        </div>
        <div class="relative">
          <div v-if="image" class="w-10 absolute right-4 top-4">
            <button class="bg-red-600 hover:bg-red-700 rounded-full p-2 duration-300 ease-in-out" @click="cancel">
              <img alt="Close" src="@/assets/svgs/trash-icon.svg">
            </button>
          </div>
          <img :src="image" class="rounded-lg h-full">
        </div>
      </div>
      <div class="w-3/5 flex-1 space-y-4 md:space-y-5 sm:p-8">
        <button class="p-2 w-8 absolute right-4 top-4 hover:bg-neutral-200 rounded-full" @click="goBack">
          <img alt="Close" src="@/assets/svgs/close-icon.svg">
        </button>
        <div>
          <textarea
            id="title" v-model="title" type="text" name="title" rows="1"
            class="bg-gray-100 text-gray-800 sm:text-4xl w-full font-bold overflow-hidden resize-none h-20 border-b-gray-900 border-t-0 border-r-0 border-l-0 focus:border-r-0 focus:border-l-0 focus:border-t-0 focus:ring-0 focus:border-[#009899]"
            placeholder="Enter your title..."
          />
        </div>

        <div>
          <KeywordsButton
            v-for="(value, index) in keywords" :key="index" :keyword="value" :index="index"
            @component:click="handleKeywordClicked"
          />
        </div>

        <div>
          <input
            id="keywords" type="text" name="keywords"
            class="bg-gray-100 text-gray-800 sm:text-xl h-12 w-full border-b-gray-900 border-t-0 border-r-0 border-l-0 focus:border-r-0 focus:border-l-0 focus:border-t-0 focus:ring-0 focus:border-[#009899]"
            placeholder="Press enter to add keywords" @keydown.enter="addKeyword" @keydown="keyDown"
          >
        </div>

        <div class="relative mb-6">
          <div
            ref="euroSign"
            class="text-gray-800 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none sm:text-xl"
            style="color: #373d4a;"
          >
            $
          </div>
          <input
            id="price" v-model.number="price" type="number" name="price"
            class="bg-gray-100 text-gray-800 sm:text-xl block w-full h-12 pl-7 p-2.5 border-t-0 border-r-0 border-l-0 focus:border-r-0 focus:border-l-0 focus:border-t-0 focus:ring-0 focus:border-[#009899]"
            placeholder="Price" @focus="onFocus" @blur="onBlur"
          >
        </div>

        <div class="flex w-full items-center justify-center mt-4">
          <button
            class="group w-44 h-14 text-neutral-50 bg-gray-800 hover:text-gray-800 hover:bg-[#CCFF00] font-medium rounded-full text-sm px-8 py-4 text-center inline-flex items-center justify-center duration-300 ease-in-out"
            @click="create"
          >
            <span v-if="isLoading">
              <svg aria-hidden="true" role="status" class="inline w-5 h-5 mr-1 mb-1 text-white group-hover:text-gray-800 animate-spin transition-all" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              Uploading...
            </span>

            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
