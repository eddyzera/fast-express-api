import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteProductServices } from '@/services/productServices/deleteProductServices'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { productObj } from '@/test/mocks/prodctObj'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let productRepository: InMemoryProductRepository
let sut: DeleteProductServices

describe('DeleteProductService', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new DeleteProductServices(productRepository)
  })
  it('should be able to delete a product', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }
    const { products } = await sut.execute({
      productId: productRepository.items[2].id,
    })
    expect(products.length).toEqual(9)
  })

  it('should not be able to delete a product', async () => {
    await expect(
      sut.execute({
        productId: 'product-id-error',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
