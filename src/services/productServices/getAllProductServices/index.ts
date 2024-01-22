import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Product } from '@prisma/client'

interface IGetAllProductServiceRequest {
  userId: string
}

interface IGetAllProductServiceResponse {
  products: Product[]
}

export class GetAllProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    userId,
  }: IGetAllProductServiceRequest): Promise<IGetAllProductServiceResponse> {
    const products = await this.productRepository.findMany(userId)
    console.log(`products =>`)
    if (products.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      products,
    }
  }
}
