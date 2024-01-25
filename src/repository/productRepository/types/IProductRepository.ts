import { Prisma, Product } from '@prisma/client'

export interface IProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findMany(userId: string): Promise<Product[]>
  delete(userId: string, productId: string): Promise<Product[]>
  findById(productId: string): Promise<Product | null>
}
