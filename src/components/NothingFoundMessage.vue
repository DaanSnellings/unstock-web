<script setup lang="ts"></script>

<template>
  <section v-motion-slide-bottom class="bg-neutral-50">
    <div class="py-8 px-4 mx-auto max-w-screen-xl h-screen lg:py-16 lg:px-6 ">
      <div class="mx-auto max-w-screen-sm text-center flex flex-col justify-center items-center">
        <img class="w-[400px] mb-4" src="@/assets/svgs/not-found-icon.svg">
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-800 md:text-4xl">
          Nothing found
        </p>
        <p class="mb-4 text-lg font-light text-gray-500">
          Sorry, we couldn't find what you're looking for. Try using simpler search terms.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
