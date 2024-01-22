import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { Customer } from '@prisma/client'

interface ICreateCustomerServiceRequest {
  name: string
  email: string
  phone: string
  user_id: string
}

interface ICreateCustomerServiceResponse {
  customer: Customer
}

export class CreateCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    email,
    name,
    phone,
    user_id,
  }: ICreateCustomerServiceRequest): Promise<ICreateCustomerServiceResponse> {
    const customer = await this.customerRepository.create({
      email,
      name,
      phone,
      user_id,
    })

    return {
      customer,
    }
  }
}
