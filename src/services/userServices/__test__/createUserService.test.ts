import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { CreateUserService } from '@/services/userServices/createUserService'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUserRepository'
import { userObj } from '@/test/mocks/userObj'

let userRepository: InMemoryUsersRepository
let sut: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserService(userRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute(userObj)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute(userObj)

    const isPasswordCorrectlyHashed = await compare(
      userObj.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
