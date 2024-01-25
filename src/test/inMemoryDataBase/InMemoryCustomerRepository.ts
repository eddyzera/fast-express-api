import { randomUUID } from 'node:crypto'
import { ICustomerRepository } from '@/repository/customerRepository/types/ICustomerRepository'
import { Customer, Prisma } from '@prisma/client'

export class InMemoryCustomerRepository implements ICustomerRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const customer = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(customer)

    return customer
  }

  async delete(userId: string, customerId: string) {
    const customers = this.items.filter(
      (it) => it.id !== customerId && it.user_id === userId,
    )

    return customers
  }
}
