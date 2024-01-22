import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import {
  IGetAllProductServiceRequest,
  IGetAllProductServiceResponse,
} from './types'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

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
