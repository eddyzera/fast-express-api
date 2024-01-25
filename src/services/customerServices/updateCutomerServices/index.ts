import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Customer } from '@prisma/client'

interface IUpdateCustomerServiceRequest {
  customerId: string
  data: Customer
}

interface IUpdateCustomerServiceResponse {
  customerUpdate: Customer
}

export class UpdateCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    customerId,
    data,
  }: IUpdateCustomerServiceRequest): Promise<IUpdateCustomerServiceResponse> {
    let customer = await this.customerRepository.findById(customerId)
    if (!customer) {
      throw new ResourceNotFoundError()
    }
    customer = {
      ...data,
    }

    const customerUpdate = await this.customerRepository.save(customer)

    return {
      customerUpdate,
    }
  }
}
