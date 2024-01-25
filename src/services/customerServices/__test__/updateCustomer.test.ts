import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateCustomerServices } from '@/services/customerServices/updateCutomerServices'
import { InMemoryCustomerRepository } from '@/test/inMemoryDataBase/InMemoryCustomerRepository'
import { customerObj } from '@/test/mocks/customerObj'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let customerRepository: InMemoryCustomerRepository
let sut: UpdateCustomerServices

describe('UpdateCustomerServices', () => {
  beforeEach(async () => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new UpdateCustomerServices(customerRepository)

    for (let i = 0; i < 10; i++) {
      await customerRepository.create({
        ...customerObj,
        name: `product-name-${i}`,
      })
    }
  })
  it('should be able to create a new customer', async () => {
    const data = {
      ...customerRepository.items[1],
      name: 'customer-name-1-update',
    }
    const { customerUpdate } = await sut.execute({
      customerId: customerRepository.items[1].id,
      data,
    })

    expect(customerUpdate.name).toEqual('customer-name-1-update')
  })

  it('should not be able to update a customer', async () => {
    const data = {
      ...customerRepository.items[1],
      name: 'product-name-1-update',
      price: new Prisma.Decimal(2.5),
    }
    await expect(
      sut.execute({
        customerId: 'customer-id-error',
        data,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
