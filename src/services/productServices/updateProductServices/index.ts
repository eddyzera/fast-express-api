import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Product, Prisma } from '@prisma/client'

interface IUpdateProductServiceRequest {
  productId: string
  data: Product
}

interface IUpdateProductServiceResponse {
  productUpdate: Product
}

export class UpdateProductService {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    productId,
    data,
  }: IUpdateProductServiceRequest): Promise<IUpdateProductServiceResponse> {
    let product = await this.productRepository.findById(productId)
    if (!product) {
      throw new ResourceNotFoundError()
    }
    product = {
      ...data,
      price: new Prisma.Decimal(data.price),
    }

    const productUpdate = await this.productRepository.save(product)

    return {
      productUpdate,
    }
  }
}
