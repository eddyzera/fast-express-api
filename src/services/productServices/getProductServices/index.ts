import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import { Product } from '@prisma/client'

interface IGetProductServicesResquest {
  productId: string
}

interface IGetProductServicesResponse {
  product: Product
}

export class GetProductServices {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    productId,
  }: IGetProductServicesResquest): Promise<IGetProductServicesResponse> {
    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new Error()
    }
    return {
      product,
    }
  }
}
