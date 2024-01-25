import { Product } from '@prisma/client'
import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

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
    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new ResourceNotFoundError()
    }
    const products = await this.productRepository.delete(product.id)

    return {
      products,
    }
  }
}
