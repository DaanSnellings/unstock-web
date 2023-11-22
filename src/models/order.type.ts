import type { Image } from './image.type'
import type { User } from './auth/user.type'

export interface Order {
  uuid: string
  image: Image
  user: User
}
