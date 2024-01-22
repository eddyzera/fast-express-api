import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { ResourceNotFoundError } from '@/services/userServices/errors/resourceNotFoundError'
import {
  IGetUserProfileServiceRequest,
  IGetUserProfileServiceResponse,
} from './types'

export class GetUserProfileService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
  }: IGetUserProfileServiceRequest): Promise<IGetUserProfileServiceResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}