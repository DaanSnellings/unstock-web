<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps(['toggleLoginPopup', 'toggleRegisterPopup'])

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function login() {
  authStore.login(email.value, password.value)
}

function goToLogin() {
  props.toggleRegisterPopup()
  props.toggleLoginPopup()
}

function closeWindow() {
  props.toggleLoginPopup()
}
</script>

<template>
  <div v-motion-fade class="popup">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-neutral-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="relative p-6 space-y-4 md:space-y-5 sm:p-8">
          <button class="p-2 w-8 absolute right-4 top-4 hover:bg-neutral-200 rounded-full" @click="closeWindow">
            <img alt="Close" src="@/assets/svgs/close-icon.svg">
          </button>

          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl text-center">
            Login to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-800">Your Email</label>
              <input
                id="email"
                v-model="email" data-testid="email" type="text" name="email"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                placeholder="Email" required="true"
              >
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
              <input
                id="password"
                v-model="password" data-testid="password" type="password" name="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                required="true"
              >
            </div>
            <div class="flex flex-col items-center justify-center">
              <button
                type="submit"
                data-testid="loginSubmit"
                class="transition-all w-[250px] text-neutral-50 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p class="text-sm font-light text-gray-500 mt-2">
                Don’t have an account yet?
                <a class="font-medium text-gray-800 hover:underline" @click="goToLogin"><button class="hover:underline">Register</button></a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
