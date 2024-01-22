import { Product } from '@prisma/client'
import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'

interface IDeleteProductServiceRequest {
  userId: string
  productId: string
}

interface IDeleteProductServiceResponse {
  products: Product[]
}

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
