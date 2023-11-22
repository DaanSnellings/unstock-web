<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps(['toggleRegisterPopup', 'toggleLoginPopup'])
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')

const authStore = useAuthStore()

function register() {
  authStore.register(email.value, password.value, firstName.value, lastName.value)
}

function goToLogin() {
  props.toggleRegisterPopup()
  props.toggleLoginPopup()
}

function closeWindow() {
  props.toggleRegisterPopup()
}
</script>

<template>
  <div v-motion-fade class="popup">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-neutral-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="relative p-6 space-y-4 md:space-y-6 sm:p-8">
          <button class="p-2 w-8 absolute right-4 top-4 hover:bg-neutral-200 rounded-full" @click="closeWindow">
            <img alt="Close" src="@/assets/svgs/close-icon.svg">
          </button>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl text-center">
            Register your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-800">Your Email</label>
              <input
                id="email" v-model="email" type="text" name="email"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                placeholder="Email" required="true"
              >
            </div>
            <div>
              <label for="firstName" class="block mb-2 text-sm font-medium text-gray-800">First Name</label>
              <input
                id="firstName" v-model="firstName" type="text" name="firstName"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                placeholder="First Name" required="true"
              >
            </div>
            <div>
              <label for="lastName" class="block mb-2 text-sm font-medium text-gray-800">Last Name</label>
              <input
                id="lastName" v-model="lastName" type="text" name="lastName"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                placeholder="Last Name" required="true"
              >
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
              <input
                id="password" v-model="password" type="password" name="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-full focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
                required="true"
              >
            </div>
            <div class="flex flex-col items-center justify-center">
              <button
                type="submit"
                class="transition-all w-[250px] text-neutral-50 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <p class="text-sm font-light text-gray-500 mt-2">
                Already have an account?
                <a class="font-medium text-gray-800 hover:underline" @click="goToLogin"><button class="hover:underline">Login</button></a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
