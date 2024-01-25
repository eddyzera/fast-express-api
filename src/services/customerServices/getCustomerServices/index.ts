import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Customer } from '@prisma/client'

interface IGetCustomerServicesRequest {
  customerId: string
}

interface IGetCustomerServicesResponse {
  customer: Customer
}

export class GetCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    customerId,
  }: IGetCustomerServicesRequest): Promise<IGetCustomerServicesResponse> {
    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    return {
      customer,
    }
  }
}
