import type { AxiosPromise } from 'axios'

import httpClient from '@/http/httpClient'
import type { Order } from '@/models/order.type'
import type { OrderRequest } from '@/models/request/orderRequest.type'
import type { OrderList } from '@/models/order-list.type'

export class OrderService {
  getAll(): AxiosPromise<Order[]> {
    return httpClient.get('/orders')
  }

  getAllByUserId(userUuid: string | undefined, offset: number, limit: number): AxiosPromise<OrderList> {
    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.get(`/orders/user/${userUuid}?offset=${offset}&limit=${limit}`, config)
  }

  createOrder(orderRequest: OrderRequest): AxiosPromise<Order> {
    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.post('/orders', orderRequest, config)
  }
}
