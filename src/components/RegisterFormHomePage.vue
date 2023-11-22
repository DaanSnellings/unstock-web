<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')

const authStore = useAuthStore()

function register() {
  authStore.register(email.value, password.value, firstName.value, lastName.value)
}
</script>

<template>
  <div class="bg-neutral-50 rounded-lg shadow-2xl w-[450px] z-10">
    <div class="relative p-6 space-y-4 md:space-y-6 sm:p-8">
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
        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="transition-all w-[250px] text-neutral-50 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
