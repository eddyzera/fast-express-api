import { Product } from '@prisma/client'

export interface ICreateProductServiceRequest {
  name: string
  description: string
  price: number
  quantity: number
  user_id: string
}

export interface ICreateProductServiceResponse {
  product: Product
}
