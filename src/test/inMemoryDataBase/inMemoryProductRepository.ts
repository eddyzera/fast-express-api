import { IProductRepository } from '@/repository/productRepository/types/IProductRepository'
import { Prisma, Product } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryProductRepository implements IProductRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: new Prisma.Decimal(data.price.toString()),
      quantity: data.quantity,
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(product)

    return product
  }

  async findMany(userId: string) {
    const product = this.items.filter((it) => it.user_id === userId)
    return product
  }

  async delete(productId: string) {
    const products = this.items.filter((it) => it.id !== productId)

    return products
  }

  async findById(productId: string) {
    const product = this.items.find((it) => it.id === productId)

    if (!product) {
      return null
    }

    return product
  }
}
