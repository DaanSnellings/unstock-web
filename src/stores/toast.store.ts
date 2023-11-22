import { defineStore } from 'pinia'
import type { ToastMessageOptions } from 'primevue/toast'
import { ref } from 'vue'

const enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useToastStore = defineStore('ToastStore', () => {
  const toastMessage = ref<ToastMessageOptions>({ detail: '', summary: '', severity: ToastType.SUCCESS })

  const addToastMessage = (title: string, message: string, toastType: ToastType): void => {
    toastMessage.value = { summary: title, detail: message, severity: toastType }
  }

  const pushSuccessMessage = (message: string): void => {
    addToastMessage('Success', message, ToastType.SUCCESS)
  }

  const pushErrorMessage = (message: string): void => {
    addToastMessage('Error', message, ToastType.ERROR)
  }

  return { toastMessage, pushErrorMessage, pushSuccessMessage }
})
