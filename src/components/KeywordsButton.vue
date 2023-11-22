<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'

const props = defineProps<{
  keyword: string
  index: number
}>()

const emit = defineEmits<{
  (event: 'component:click', index: number): void
}>()

const hover = ref(false)

const deleteButton = ref<HTMLDivElement>() as Ref<HTMLDivElement>

function removeKeyword() {
  emit('component:click', props.index)
}

onMounted(() => {
  const width = props.keyword.length * 12
  deleteButton.value.style.minWidth = `${60}px`
  deleteButton.value.style.width = `${width}px`
})
</script>

<template>
  <button
    ref="deleteButton" v-motion-slide-right class="group text-neutral-50 mr-[5px] mb-[5px] bg-[#009899] focus:outline-none hover:bg-red-500 transition duration-300 ease-in-out font-medium rounded-full text-sm px-4 py-2.5 h-10 flex items-center justify-center float-left" @click="removeKeyword"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <img alt="Close" src="@/assets/svgs/trash-icon.svg" class="transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute">
    <div class="opacity-100 group-hover:opacity-0 absolute">
      {{ props.keyword }}
    </div>
  </button>
</template>
