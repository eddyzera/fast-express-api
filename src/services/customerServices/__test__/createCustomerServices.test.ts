import { expect, describe, it, beforeEach } from 'vitest'
import { CreateCustomerServices } from '@/services/customerServices/createCustomerServices'
import { InMemoryCustomerRepository } from '@/test/inMemoryDataBase/InMemoryCustomerRepository'
import { customerObj } from '@/test/mocks/customerObj'

let customerRepository: InMemoryCustomerRepository
let sut: CreateCustomerServices

describe('CreateCustomerService', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new CreateCustomerServices(customerRepository)
  })
  it('should be able to create a new customer', async () => {
    const { customer } = await sut.execute(customerObj)

    expect(customer.id).toEqual(expect.any(String))
  })
})
