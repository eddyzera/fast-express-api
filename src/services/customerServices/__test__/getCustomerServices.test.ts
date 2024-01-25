import { expect, describe, it, beforeEach } from 'vitest'
import { customerObj } from '@/test/mocks/customerObj'
import { InMemoryCustomerRepository } from '@/test/inMemoryDataBase/InMemoryCustomerRepository'
import { GetCustomerServices } from '@/services/customerServices/getCustomerServices'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let customerRepository: InMemoryCustomerRepository
let sut: GetCustomerServices

describe('GetCustomerService', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new GetCustomerServices(customerRepository)
  })
  it('should be able to get a customer', async () => {
    for (let i = 0; i < 10; i++) {
      await customerRepository.create({
        ...customerObj,
        name: `customer-name-${i}`,
      })
    }
    const { customer } = await sut.execute({
      customerId: customerRepository.items[2].id,
    })
    expect(customer.id).toEqual(expect.any(String))
  })

  it('should not be able to get a customer', async () => {
    await expect(
      sut.execute({
        customerId: 'customer-id-error',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
