import { User } from '@prisma/client'

export interface IGetUserProfileServiceRequest {
  userId: string
}

export interface IGetUserProfileServiceResponse {
  user: User
}
