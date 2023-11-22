<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue'
import { cld } from '@/services/cloudinary.service'
import MaginifyingGlass from '@/components/svgs/MagnifyingGlassSVG.vue'

const img4 = cld.image('unstockexamples/jwvx3ppwore73b5fyia9').format('auto')
const img2 = cld.image('unstockexamples/xrp46r3lnlg4blnp7dnh').format('auto')
const img1 = cld.image('unstockexamples/fr6colivu2wcdul0zv4z').format('auto')
const img3 = cld.image('unstockexamples/pibffuonmkn3rb9xrany').format('auto')
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center"
  >
    <h1 class=" text-center mb-4 text-7xl font-extrabold leading-none tracking-tight text-[#00c08c]">
      Search for new ideas
    </h1>
    <p class=" text-center mb-6 text-lg font-normal text-[#2cd778] lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Think of a someone you might love, like Harold.
      Search for 'Harold being happy' and see what you find.
    </p>
  </div>
  <div class="w-full h-full pl-10 pr-8 py-12">
    <div class="relative flex flex-row items-center justify-center w-full h-full z-10">
      <AdvancedImage v-motion-pop-visible class="h-[280px] rounded-3xl absolute left-14 mb-10 pointer-events-none border-2" :cld-img="img4" />
      <AdvancedImage v-motion-pop-visible class="h-[300px] rounded-3xl absolute top-0 right-24 pointer-events-none" :cld-img="img2" />
      <AdvancedImage v-motion-pop-visible class="h-[450px] rounded-3xl absolute z-20 pointer-events-none" :cld-img="img1" />
      <AdvancedImage v-motion-pop-visible class="h-[250px] rounded-3xl absolute bottom-10 right-20 pointer-events-none" :cld-img="img3" />
      <div v-motion-pop-visible class="absolute z-30 mr-24 items-center justify-center flex">
        <div class="absolute left-0 h-9 w-9 pl-2">
          <MaginifyingGlass class="stroke-[#00c08c] w-full h-full" />
        </div>
        <div
          class="bg-[#f5fbd4] rounded-full p-5 pl-10 text-2xl font-semibold text-[#00c08c]"
        >
          Harold being happy
        </div>
      </div>
    </div>
  </div>
</template>
