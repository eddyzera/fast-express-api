import { Product } from '@prisma/client'

export interface IDeleteProductServiceRequest {
  userId: string
  productId: string
}

export interface IDeleteProductServiceResponse {
  products: Product[]
}
