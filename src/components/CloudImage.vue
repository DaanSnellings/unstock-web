<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue'
import { cld } from '@/services/cloudinary.service'
import type { Image } from '@/models/image.type'

const props = defineProps<{
  image: Image
}>()

const myImg = cld.image(props.image.url).format('auto')
</script>

<template>
  <AdvancedImage class="w-full rounded-3xl pointer-events-none" :cld-img="myImg" />
</template>
