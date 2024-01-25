import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteCustomerServices } from '@/services/customerServices/deleteCustomerServices'
import { InMemoryCustomerRepository } from '@/test/inMemoryDataBase/InMemoryCustomerRepository'
import { customerObj } from '@/test/mocks/customerObj'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let customerRepository: InMemoryCustomerRepository
let sut: DeleteCustomerServices

describe('DeleteCustomerServices', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new DeleteCustomerServices(customerRepository)
  })
  it('should be able to delete a customer', async () => {
    for (let i = 0; i < 10; i++) {
      await customerRepository.create({
        ...customerObj,
        name: `customer-name-${i}`,
      })
    }

    const { customers } = await sut.execute({
      customerId: customerRepository.items[0].id,
    })

    expect(customers.length).toEqual(9)
  })

  it('should not be able to delete a customer', async () => {
    expect(
      sut.execute({ customerId: 'error-customer' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
