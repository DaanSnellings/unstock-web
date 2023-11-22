import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { AuthService } from '@/services/auth.service'
import type { User } from '@/models/auth/user.type'
import type { AuthTokens } from '@/models/auth/authToken.type'
import type { UserInfo } from '@/models/auth/userInfo.type'
import { useToastStore } from '@/stores/toast.store'
import router from '@/router'

export const useAuthStore = defineStore('AuthStore', () => {
  const isLoading = ref<boolean>(false)
  const authService = new AuthService()
  const toastStore = useToastStore()

  const authTokens = useStorage<any>('authTokens', null, undefined, { serializer: StorageSerializers.object })
  const authenticatedUser = ref<User | null>(null)
  const userinfo = ref<UserInfo | null>(null)

  const isAuthenticated = computed<boolean>(
    () => !!authTokens.value?.access_token && !!authTokens.value?.refresh_token,
  )

  const getUserInfo = async (): Promise<void> => {
    try {
      isLoading.value = true
      if (isAuthenticated.value) {
        const responseUserInfo = await authService.getUserInfo()
        userinfo.value = responseUserInfo.data

        if (responseUserInfo.status === 200) {
          const responseUser = await authService.getUser(userinfo.value?.uuid)
          authenticatedUser.value = responseUser.data
        }
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const setAuthTokens = (tokens: AuthTokens | null): void => {
    authTokens.value = tokens
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      isLoading.value = true
      const responseLogin = await authService.login(email, password)
      setAuthTokens(responseLogin.data)

      if (responseLogin.status === 200) {
        await getUserInfo()
        router.push({ name: 'authenticated-home' })
        toastStore.pushSuccessMessage('Login Successful')
      }
    }
    catch (error) {
      toastStore.pushErrorMessage('Wrong Credentials')
    }
    finally {
      isLoading.value = false
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
    try {
      isLoading.value = true
      const responseRegister = await authService.register(email, password, firstName, lastName)
      if (responseRegister.status === 200) {
        toastStore.pushSuccessMessage('Registration Successful')
        await login(email, password)
      }
      else {
        toastStore.pushErrorMessage('Registration Failed')
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const clearTokens = async (): Promise<void> => {
    setAuthTokens(null)
    router.push('/')
    authenticatedUser.value = null
    userinfo.value = null
  }

  const logout = async (): Promise<void> => {
    try {
      isLoading.value = true
      await clearTokens()
      toastStore.pushSuccessMessage('Successfully logged out.')
    }
    finally {
      isLoading.value = false
    }
  }

  return { register, login, logout, clearTokens, getUserInfo, setAuthTokens, isLoading, authenticatedUser, isAuthenticated, userinfo, authTokens }
})
