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

  async delete(customerId: string) {
    const customers = this.items.filter((it) => it.id !== customerId)
    return customers
  }

  async findById(customerId: string) {
    const customer = this.items.find((it) => it.id === customerId)

    if (!customer) {
      return null
    }

    return customer
  }

  async findMany(userId: string) {
    const customers = this.items.filter((it) => it.user_id === userId)
    if (customers.length === 0) {
      return null
    }

    return customers
  }

  async save(customer: Customer) {
    const customerIndex = this.items.findIndex(
      (item) => item.id === customer.id,
    )

    if (customerIndex >= 0) {
      this.items[customerIndex] = customer
    }

    return customer
  }
}
