import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
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
    const customers = await this.customerRepository.delete(customerId)
    if (!customers) {
      throw new Error()
    }
    return {
      customers,
    }
  }
}
