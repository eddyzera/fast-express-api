import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from '../../errors/userAlreadyExistsError'
import { User } from '@prisma/client'

export interface ICreateUserServiceRequest {
  name: string
  email: string
  password: string
}

export interface ICreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExists()
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
