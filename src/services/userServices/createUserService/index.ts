import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { ICreateUserServiceRequest, ICreateUserServiceResponse } from './types'

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse> {
    const user = await this.userRepository.create({
      name,
      email,
      password_hash: password,
    })

    return {
      user,
    }
  }
}
