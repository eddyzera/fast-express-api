import { IUserRepository } from '@/repository/userRepository/types/IUserRepository'
import { ResourceNotFoundError } from '@/services/errors/resourceNotFoundError'
import { User } from '@prisma/client'
export interface IGetUserProfileServiceRequest {
  userId: string
}

export interface IGetUserProfileServiceResponse {
  user: User
}

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
