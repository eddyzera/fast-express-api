import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUserRepository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from '@/services/userServices/getUserProfileService'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile UseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(userRepository)
  })
  it('should be able to get user profile', async () => {
    const { id } = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonh_doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: id,
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Jonh Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'user-not-existing',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
