<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue'
import { cld } from '@/services/cloudinary.service'

const img1 = cld.image('unstockexamples/khuyytc2esvyetq8otlz').format('auto')
const img2 = cld.image('unstockexamples/xu3gv59e3rfzxs8ion8y').format('auto')
const img3 = cld.image('unstockexamples/bpmksup17q5kwkq56arz').format('auto')
const img4 = cld.image('unstockexamples/lokpv2cqc0rwhb6drxvk').format('auto')
const img5 = cld.image('unstockexamples/q2k7gqe2u1lrwncpr2f1').format('auto')
</script>

<template>
  <div class=" w-full h-full flex items-center justify-center z-10 relative">
    <div v-motion-fade-visible class="absolute right-10 top-10">
      <div class="h-[350px] w-[350px] relative">
        <AdvancedImage class="rounded-3xl object-cover pointer-events-none w-full h-full" :cld-img="img1" />
        <div class="w-full rounded-3xl absolute inset-0 bg-gray-900 bg-opacity-20" />
        <p class="absolute bottom-5 left-5 text-3xl font-semibold text-neutral-50">
          Harold on the phone
        </p>
      </div>
    </div>

    <div v-motion-fade-visible class="absolute left-5 top-20">
      <div class="h-[300px] w-[300px] relative">
        <AdvancedImage class="rounded-3xl object-cover pointer-events-none w-full h-full" :cld-img="img2" />
        <div class="w-full rounded-3xl absolute inset-0 bg-gray-900 bg-opacity-20" />
        <p class="absolute bottom-5 left-5 text-3xl font-semibold text-neutral-50">
          Fitness Harold
        </p>
      </div>
    </div>

    <div v-motion-fade-visible class="absolute left-10 bottom-36">
      <div class="h-[200px] w-[200px] relative">
        <AdvancedImage class="rounded-3xl object-cover pointer-events-none w-full h-full" :cld-img="img3" />
        <div class="w-full rounded-3xl absolute inset-0 bg-gray-900 bg-opacity-20" />
        <p class="absolute bottom-5 left-5 text-2xl font-semibold text-neutral-50">
          Smart Harold
        </p>
      </div>
    </div>

    <div v-motion-fade-visible class="absolute bottom-20">
      <div class="h-[250px] w-[250px] relative">
        <AdvancedImage class="rounded-3xl object-cover pointer-events-none w-full h-full" :cld-img="img4" />
        <div class="w-full rounded-3xl absolute inset-0 bg-gray-900 bg-opacity-20" />
        <p class="absolute bottom-5 left-5 text-3xl font-semibold text-neutral-50">
          Happy Harold
        </p>
      </div>
    </div>

    <div v-motion-fade-visible class="absolute right-20 bottom-44">
      <div class="h-[150px] w-[150px] relative">
        <AdvancedImage class="rounded-3xl object-cover pointer-events-none w-full h-full" :cld-img="img5" />
        <div class="w-full rounded-3xl absolute inset-0 bg-gray-900 bg-opacity-20" />
        <p class="absolute bottom-5 left-5 text-2xl font-semibold text-neutral-50">
          Chess
        </p>
      </div>
    </div>
  </div>
  <div
    class="w-full h-full flex flex-col items-center justify-center"
  >
    <h1 class="text-center mb-4 text-7xl font-extrabold leading-none tracking-tight text-neutral-50">
      Buy and sell unstockphotos
    </h1>
    <p class=" text-center mb-6 text-lg font-normal text-neutral-50 lg:text-xl sm:px-16 xl:px-48">
      Everyone can create unstockphotos and sell them on our platform.
    </p>
  </div>
</template>
