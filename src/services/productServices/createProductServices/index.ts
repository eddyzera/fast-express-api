import { Product } from '@prisma/client'

import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'

interface ICreateProductServiceRequest {
  name: string
  description: string
  price: number
  quantity: number
  user_id: string
}

interface ICreateProductServiceResponse {
  product: Product
}

export class CreateProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    name,
    description,
    price,
    quantity,
    user_id,
  }: ICreateProductServiceRequest): Promise<ICreateProductServiceResponse> {
    const product = await this.productRepository.create({
      name,
      description,
      price,
      quantity,
      user_id,
    })

    return {
      product,
    }
  }
}
