import { Customer, Prisma } from '@prisma/client'

export interface ICustomerRepository {
  create(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer>
}
