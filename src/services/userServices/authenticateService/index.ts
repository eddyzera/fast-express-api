import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import {
  IAuthenticateServiceRequest,
  IAuthenticateServiceResponse,
} from '@/services/userServices/authenticateService/types'

export class AuthenticateService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error()
    }

    return {
      user,
    }
  }
}
