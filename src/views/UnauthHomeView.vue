<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import RotatingWords from '@/components/RotatingWords.vue'
import ScrollDownArrowButton from '@/components/ScrollDownArrowButton.vue'
import SectorTwoContent from '@/components/SectorTwoContent.vue'
import SectorThreeContent from '@/components/SectorThreeContent.vue'
import SectorFourContent from '@/components/SectorFourContent.vue'

const s2 = ref<HTMLElement | null>(null)
const s3 = ref<HTMLElement | null>(null)
const s4 = ref<HTMLElement | null>(null)

const currentIndex = ref<number>(0)
const sections = ref<(HTMLElement | null)[]>([])

function scrollToTop() {
  if (currentIndex.value === 0)
    return
  if (currentIndex.value === 1) {
    currentIndex.value--
    document.getElementById('header')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  currentIndex.value--
  const section = sections.value?.[currentIndex.value]
  section?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToBottom() {
  if (currentIndex.value === sections.value?.length - 1)
    return

  currentIndex.value++
  const section = sections.value?.[currentIndex.value]
  section?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  sections.value = [null, s2.value, s3.value, s4.value]
})

const handleThrottleScroll = useThrottleFn((e: WheelEvent) => {
  const delta = e.deltaY / 30 || -e.detail
  if (delta < -0.5)
    scrollToTop()

  else if (delta > 0.5)
    scrollToBottom()

  // disableWheel()
}, 300)

function wheelscroll(e: WheelEvent) {
  e.preventDefault()
  handleThrottleScroll(e)
}

// function disableWheel() {
//   document.body.addEventListener('wheel', (e) => {
//     e.preventDefault()
//   }, { passive: false })
// }
</script>

<template>
  <div @wheel="wheelscroll">
    <section class="relative w-full h-[calc(100vh-80px)] bg-neutral-50 flex justify-center pt-24">
      <RotatingWords />
      <ScrollDownArrowButton class="absolute z-10" @component:click="scrollToBottom" />
      <img src="@/assets/svgs/layered-waves-haikei1.svg" class="absolute bottom-0 left-0 w-full">
    </section>
    <section ref="s2" class="w-full h-screen bg-[#CCFF00] relative flex flex-row items-center justify-center">
      <div class="w-full h-full flex items-center justify-center">
        <SectorTwoContent />
        <img src="@/assets/svgs/layered-waves-haikei2.svg" class="absolute bottom-0 left-0 w-full">
      </div>
    </section>
    <section ref="s3" class="w-full h-screen bg-[#50E463] relative flex flex-row items-center justify-center ">
      <SectorThreeContent />
      <img src="@/assets/svgs/layered-waves-haikei3.svg" class="absolute bottom-0 left-0 w-full">
    </section>
    <section ref="s4" class="w-full h-screen bg-[#00C08C] relative flex flex-row items-center justify-center">
      <SectorFourContent />
      <img src="@/assets/svgs/layered-waves-haikei4.svg" class="absolute bottom-0 left-0 w-full">
    </section>
  </div>
</template>

<style scoped>
</style>
