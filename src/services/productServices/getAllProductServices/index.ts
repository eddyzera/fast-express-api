import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import {
  IGetAllProductServiceRequest,
  IGetAllProductServiceResponse,
} from './types'

export class GetAllProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    userId,
  }: IGetAllProductServiceRequest): Promise<IGetAllProductServiceResponse> {
    const product = await this.productRepository.findMany(userId)

    if (!product) {
      throw new Error()
    }

    return {
      product,
    }
  }
}
