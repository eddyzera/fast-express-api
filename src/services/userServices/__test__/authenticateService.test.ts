import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from '@/services/userServices/authenticateService'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUserRepository'
import { userObj } from '@/test/mocks/userObj'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/services/errors/invalidCredentialsError'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('AuthenticateService', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
      ...userObj,
      password_hash: await hash(userObj.password, 6),
    })
    const { user } = await sut.execute({
      email: userObj.email,
      password: userObj.password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      ...userObj,
      password_hash: await hash(userObj.password, 6),
    })

    await expect(
      sut.execute({
        email: 'john_doe-invalid@example.com',
        password: userObj.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      ...userObj,
      password_hash: await hash(userObj.password, 6),
    })

    await expect(() =>
      sut.execute({
        email: userObj.email,
        password: '123478',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
