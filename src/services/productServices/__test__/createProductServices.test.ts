import { expect, describe, it, beforeEach } from 'vitest'
import { CreateProductServices } from '@/services/productServices/createProductServices'
import { InMemoryProductRepository } from '@/test/inMemoryDataBase/inMemoryProductRepository'
import { productObj } from '@/test/mocks/prodctObj'

let productRepository: InMemoryProductRepository
let sut: CreateProductServices

describe('CreateProductService', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new CreateProductServices(productRepository)
  })
  it('should be able to create a new product', async () => {
    const { product } = await sut.execute(productObj)

    expect(product.id).toEqual(expect.any(String))
  })
})
