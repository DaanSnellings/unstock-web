<script setup lang="ts">
</script>

<template>
  <div v-motion-fade class="wrapper bg-neutral-50">
    <p class="bg-neutral-50 prevent-select">
      Unstock photos for
    </p>
    <div class="words">
      <span class=" text-[#CCFF00] prevent-select">   Advertising</span>
      <span class=" text-[#50E463] prevent-select">  Webdesigns</span>
      <span class=" text-[#00C08C] prevent-select"> Social Media</span>
      <span class=" text-[#009899] prevent-select">    Presentations</span>
      <span class=" text-[#CCFF00] prevent-select">   Advertising</span>
    </div>
  </div>
</template>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  font-size: 50px;
  font-weight: 500;
}

body {
  display: grid;
  place-items: center;
  padding-top: 10%;
}

.wrapper {
  box-sizing: content-box;
  height: 70px;
  padding: 50px 30px;
  display: flex;
  border-radius: 8px;
}

.words {
  overflow: hidden;
}

span {
  display: block;
  height: 100%;
  padding-left: 10px;
  animation: spin_words 20s infinite;
}

@keyframes spin_words {
  10% {
    transform: translateY(-112%);
  }

  25% {
    transform: translateY(-100%);
  }

  35% {
    transform: translateY(-212%);
  }

  50% {
    transform: translateY(-200%);
  }

  60% {
    transform: translateY(-312%);
  }

  75% {
    transform: translateY(-300%);
  }

  85% {
    transform: translateY(-412%);
  }

  100% {
    transform: translateY(-400%);
  }
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
