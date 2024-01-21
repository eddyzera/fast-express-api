import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from '@/services/userServices/authenticateService'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUserRepository'
import { userObj } from '@/test/mocks/userObj'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('AuthenticateService', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
  })
  it('should be able to authenticate', async () => {
    const { user } = await sut.execute(userObj)

    expect(user.id).toEqual(expect.any(String))
  })
})
