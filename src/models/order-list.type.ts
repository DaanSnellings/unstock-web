import type { Order } from './order.type'
import type { Meta } from './meta.type'

export interface OrderList {
  orders: Order[]
  meta: Meta
}
