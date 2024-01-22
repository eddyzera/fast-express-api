import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import {
  ICreateProductServiceRequest,
  ICreateProductServiceResponse,
} from './types'

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
