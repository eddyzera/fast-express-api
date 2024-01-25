import { expect, describe, it, beforeEach } from 'vitest'
import { productObj } from '@/test/mocks/prodctObj'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { GetProductServices } from '@/services/productServices/getProductServices'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let productRepository: InMemoryProductRepository
let sut: GetProductServices

describe('GetProductService', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetProductServices(productRepository)
  })
  it('should be able to get a product', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }
    const { product } = await sut.execute({
      productId: productRepository.items[2].id,
    })
    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be able to get a product', async () => {
    await expect(
      sut.execute({
        productId: 'product-id-error',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
