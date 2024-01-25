import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { Customer } from '@prisma/client'

interface IDeleteCustomerServiceRequest {
  customerId: string
  userId: string
}

interface IDeleteCustomerServiceResponse {
  customers: Customer[]
}

export class DeleteCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    customerId,
    userId,
  }: IDeleteCustomerServiceRequest): Promise<IDeleteCustomerServiceResponse> {
    const customers = await this.customerRepository.delete(userId, customerId)
    if (!customers) {
      throw new Error()
    }
    return {
      customers,
    }
  }
}
