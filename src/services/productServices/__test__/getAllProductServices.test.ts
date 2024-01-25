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
  it('should be able to get all products', async () => {
    for (let i = 0; i < 10; i++) {
      await productRepository.create({
        ...productObj,
        name: `product-name-${i}`,
      })
    }

    await productRepository.create({
      ...productObj,
      name: `product-name-01`,
      user_id: 'user_id-02',
    })

    await productRepository.create({
      ...productObj,
      name: `product-name-01`,
      user_id: 'user_id-02',
    })

    const { products } = await sut.execute({ userId: 'user_id-02' })
    expect(products.length).toEqual(2)
    expect(products[1].user_id).toEqual('user_id-02')
  })

  it('should not be able to show all product if not exists', async () => {
    await expect(() =>
      sut.execute({ userId: productObj.user_id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
