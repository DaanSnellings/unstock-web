<script setup lang="ts">
import { ref } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import LoginButton from '@/components/LoginButton.vue'
import RegisterButton from '@/components/RegisterButton.vue'
import HomeButton from '@/components/HomeButton.vue'

const loginTrigger = ref(false)
const registerTrigger = ref(false)

function ToggleLoginPopup() {
  loginTrigger.value = !loginTrigger.value
}

function ToggleRegisterPopup() {
  registerTrigger.value = !registerTrigger.value
}
</script>

<template>
  <nav id="header" class="bg-neutral-50 space-x-5 h-[80px] flex items-center shadow-sm z-10 relative">
    <HomeButton class="pl-4" />
    <div class="w-full bg-neutral-50" />
    <div class="flex-none space-x-2 bg-neutral-50 pr-4">
      <LoginButton data-testid="loginButton" @click="ToggleLoginPopup" />
      <RegisterButton @click="ToggleRegisterPopup" />
    </div>
  </nav>

  <LoginForm
    v-if="loginTrigger"
    :toggle-login-popup="ToggleLoginPopup"
    :toggle-register-popup="ToggleRegisterPopup"
  />

  <RegisterForm
    v-if="registerTrigger"
    :toggle-login-popup="ToggleLoginPopup"
    :toggle-register-popup="ToggleRegisterPopup"
  />
</template>

<style scoped>

</style>
