import { expect, describe, it, beforeEach } from 'vitest'
import { productObj } from '@/test/mocks/prodctObj'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { GetAllProductServices } from '@/services/productServices/getAllProductServices'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

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
    const { products } = await sut.execute({ userId: productObj.user_id })
    expect(products.length).toEqual(10)
  })

  it('should not be able to show all product if not exists', async () => {
    await expect(() =>
      sut.execute({ userId: productObj.user_id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
