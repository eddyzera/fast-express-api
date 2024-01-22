import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import {
  IDeleteProductServiceRequest,
  IDeleteProductServiceResponse,
} from './types'

export class DeleteProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    userId,
    productId,
  }: IDeleteProductServiceRequest): Promise<IDeleteProductServiceResponse> {
    const products = await this.productRepository.delete(userId, productId)
    console.log(`products execute =>`, products)
    return {
      products,
    }
  }
}
