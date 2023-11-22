<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

import { useToastStore } from '@/stores/toast.store'

const toast = useToast()
const toastMessageStore = useToastStore()

watch(toastMessageStore, (store) => {
  if (store.toastMessage) {
    toast.add({
      severity: store.toastMessage.severity,
      summary: store.toastMessage.summary,
      detail: store.toastMessage.detail,
      life: 3000,
    })
  }
})
</script>

<template>
  <Toast
    class="toast"
    position="bottom-right"
  />
</template>
