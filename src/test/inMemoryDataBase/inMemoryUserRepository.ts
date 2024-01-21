import { randomUUID } from 'node:crypto'
import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { Prisma, User } from '@prisma/client'

export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}