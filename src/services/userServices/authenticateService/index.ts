import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import {
  IAuthenticateServiceRequest,
  IAuthenticateServiceResponse,
} from '@/services/userServices/authenticateService/types'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '@/services/errors/invalidCredentialsError'

export class AuthenticateService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
