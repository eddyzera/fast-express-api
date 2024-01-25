import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Customer } from '@prisma/client'

interface IDeleteCustomerServiceRequest {
  customerId: string
}

interface IDeleteCustomerServiceResponse {
  customers: Customer[]
}

export class DeleteCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    customerId,
  }: IDeleteCustomerServiceRequest): Promise<IDeleteCustomerServiceResponse> {
    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    const customers = await this.customerRepository.delete(customer.id)
    return {
      customers,
    }
  }
}
