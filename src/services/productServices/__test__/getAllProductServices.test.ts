import { expect, describe, it, beforeEach } from 'vitest'
import { productObj } from '@/test/mocks/prodctObj'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { GetAllProductServices } from '@/services/productServices/getAllProductServices'

let productRepository: InMemoryProductRepository
let sut: GetAllProductServices

describe('GetAllProductService', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetAllProductServices(productRepository)
  })
  it('should be able to get all product', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }
    const { product } = await sut.execute({ userId: productObj.user_id })
    expect(product.length).toEqual(10)
  })
})
