import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { ICreateUserServiceRequest, ICreateUserServiceResponse } from './types'
import { hash } from 'bcryptjs'

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error()
    }
    const password_hash = await hash(password, 6)
    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
