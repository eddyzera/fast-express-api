import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateProductService } from '@/services/productServices/updateProductServices'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { productObj } from '@/test/mocks/prodctObj'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let productRepository: InMemoryProductRepository
let sut: UpdateProductService

describe('UpdateProductService', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new UpdateProductService(productRepository)
  })
  it('should be able to create a new product', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }
    // 'product-name-1-update'
    const data = {
      ...productRepository.items[1],
      name: 'product-name-1-update',
      price: new Prisma.Decimal(2.5),
    }
    const { productUpdate } = await sut.execute({
      productId: productRepository.items[1].id,
      data,
    })

    console.log(`productRepository`, productRepository.items)
    expect(productUpdate.name).toEqual('product-name-1-update')
  })

  it('should not be able to update a product', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }
    // 'product-name-1-update'
    const data = {
      ...productRepository.items[1],
      name: 'product-name-1-update',
      price: new Prisma.Decimal(2.5),
    }
    await expect(
      sut.execute({
        productId: 'product-id-error',
        data,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
