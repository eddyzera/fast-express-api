import { Product } from '@prisma/client'
import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'

interface IDeleteProductServiceRequest {
  productId: string
}

interface IDeleteProductServiceResponse {
  products: Product[]
}

export class DeleteProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    productId,
  }: IDeleteProductServiceRequest): Promise<IDeleteProductServiceResponse> {
    const products = await this.productRepository.delete(productId)
    console.log(`products execute =>`, products)
    return {
      products,
    }
  }
}
