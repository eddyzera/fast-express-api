import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import {
  IAuthenticateServiceRequest,
  IAuthenticateServiceResponse,
} from '@/services/userServices/authenticateService/types'

export class AuthenticateService {
  constructor(private userRepository: IUserRepository) {}

  async execute({}: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {}
}
