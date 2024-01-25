import { Customer, Prisma } from '@prisma/client'

export interface ICustomerRepository {
  create(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer>
  delete(customerId: string): Promise<Customer[]>
  findById(customerId: string): Promise<Customer | null>
  findMany(userId: string): Promise<Customer[] | null>
  save(product: Customer): Promise<Customer>
}
