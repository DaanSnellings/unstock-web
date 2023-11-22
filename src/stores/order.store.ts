import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.store'
import { useToastStore } from './toast.store'
import { OrderService } from '@/services/order.service'
import type { Order } from '@/models/order.type'
import type { OrderRequest } from '@/models/request/orderRequest.type'

export const useOrderStore = defineStore('OrderStore', () => {
  const isLoading = ref<boolean>(false)
  const orders = ref<Order[]>([])
  const ordersByUserId = ref<Order[]>([])
  const totalOrdersByCurrentUser = ref<number>(0)
  const orderService = new OrderService()

  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const delay = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const fetchByCurrentUser = async (offset: number, limit: number): Promise<void> => {
    try {
      isLoading.value = true
      const response = await orderService.getAllByUserId(authStore.userinfo?.uuid as string, offset, limit)
      const newOrders = response.data.orders
      const meta = response.data.meta
      totalOrdersByCurrentUser.value = meta.total

      for (const order of newOrders) {
        await delay(1)
        ordersByUserId.value = [...ordersByUserId.value, order]
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const createOrder = async (imageId: string, userId: string): Promise<void> => {
    try {
      isLoading.value = true
      const orderRequest: OrderRequest = {
        imageUuid: imageId,
        userUuid: userId,
      }

      const response = await orderService.createOrder(orderRequest)
      orders.value.push(response.data)

      toastStore.pushSuccessMessage('Image purchased')
    }
    finally {
      isLoading.value = false
    }
  }

  return { fetchByCurrentUser, createOrder, isLoading, orders, ordersByUserId, totalOrdersByCurrentUser }
})
