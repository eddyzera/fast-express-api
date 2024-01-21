import { User } from '@prisma/client'

export interface IAuthenticateServiceRequest {
  email: string
  password: string
}

export interface IAuthenticateServiceResponse {
  user: User
}
