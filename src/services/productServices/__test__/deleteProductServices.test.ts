import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteProductServices } from '@/services/productServices/deleteProductServices'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { productObj } from '@/test/mocks/prodctObj'

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
})
