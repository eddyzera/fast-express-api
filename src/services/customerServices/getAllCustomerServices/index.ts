import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'

export class GetAllCustomerServices {
  constructor(private customerRepository: ICustomerRepository) {}
}
