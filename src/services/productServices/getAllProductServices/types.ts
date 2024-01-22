import { Product } from '@prisma/client'

export interface IGetAllProductServiceRequest {
  userId: string
}

export interface IGetAllProductServiceResponse {
  product: Product[]
}
