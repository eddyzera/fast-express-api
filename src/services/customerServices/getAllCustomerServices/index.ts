import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { Customer } from '@prisma/client'

interface IGetAllCustomerServicesRequest {
  userId: string
}

interface IGetAllCustomerServicesResponse {
  customers: Customer[]
}

export class GetAllCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    userId,
  }: IGetAllCustomerServicesRequest): Promise<IGetAllCustomerServicesResponse> {
    const customers = await this.customerRepository.findMany(userId)

    if (!customers) {
      throw new ResourceNotFoundError()
    }

    return {
      customers,
    }
  }
}
