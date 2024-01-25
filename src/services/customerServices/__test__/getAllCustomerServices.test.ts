import { expect, describe, it, beforeEach } from 'vitest'
import { customerObj } from '@/test/mocks/customerObj'
import { InMemoryCustomerRepository } from '@/test/inMemoryDataBase/InMemoryCustomerRepository'
import { GetAllCustomerServices } from '@/services/customerServices/getAllCustomerServices'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'

let customerRepository: InMemoryCustomerRepository
let sut: GetAllCustomerServices

describe('GetAllCustomerService', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new GetAllCustomerServices(customerRepository)
  })
  it('should be able to get all customers', async () => {
    for (let i = 0; i < 10; i++) {
      await customerRepository.create({
        ...customerObj,
        name: `product-name-${i}`,
      })
    }

    await customerRepository.create({
      ...customerObj,
      name: `product-name-01`,
      user_id: 'user_id-02',
    })

    await customerRepository.create({
      ...customerObj,
      name: `product-name-01`,
      user_id: 'user_id-02',
    })

    const { customers } = await sut.execute({ userId: 'user_id-02' })
    expect(customers.length).toEqual(2)
    expect(customers[1].user_id).toEqual('user_id-02')
  })
})
