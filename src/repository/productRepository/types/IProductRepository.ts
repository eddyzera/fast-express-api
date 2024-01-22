import { Prisma, Product } from '@prisma/client'

export interface IProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findMany(userId: string): Promise<Product[] | null>
}
